const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const Yup = require('yup');
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis').RedisStore;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config()

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsConfig
});
const port = 3006;

// Инициализация базы данных
const db = new sqlite3.Database(path.resolve(__dirname, 'yorha_database.db'), (err) => {
  if (err) {
    console.error('Error while connecting to database: ', err.message);
  } else {
    console.log('Connection to database has been successful');
  }
});

// Инициализация Redis
const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'localhost:',
});

const setUserStatus = async (userId, status) => {
  await redisClient.set(`user_status:${userId}`, status, { EX: 60 }) // TTL 1 min
  await redisClient.set(`user_last_seen:${userId}`, new Date().toISOString(), { EX: 60 })
}

const getUserStatus = async (userId) => {
  const status = await redisClient.get(`user_status:${userId}`)
  const lastSeen = await redisClient.get(`user_last_seen:${userId}`)

  if (status && lastSeen) {
    return { status, lastSeen: new Date(lastSeen) }
  }

  const row = await new Promise((res, rej) => {
    db.get('SELECT last_seen_at FROM Users WHERE id = ?', [userId], (err, row) => {
      if (err) rej(err)
      else res(row)
    })
  })

  return {
    status: 'offline',
    lastSeen: row ? new Date(row.last_seen_at) : null
  }
}

const updateLastSeenInDB = async (userId) => {
  const lastSeen = new Date().toISOString()
  db.run('UPDATE Users SET last_seen_at = ? WHERE id = ?', [lastSeen, userId])
}

const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return 'Offline for a while'

  const now = new Date()
  const diffInMinutes = Math.floor((now - lastSeen) / (1000 * 60))

  if (diffInMinutes < 1) return 'Online'
  if (diffInMinutes < 5) return 'Was online 1 minute ago'
  if (diffInMinutes < 15) return 'Was online 5 minutes ago'
  if (diffInMinutes < 60) return 'Was online 15 minutes ago'

  const isToday = lastSeen.toDateString() === now.toDateString()
  const isYesterday = lastSeen.toDateString() === new Date(now - 86400000).toDateString()

  if (isToday) return `Today at ${lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (isYesterday) return `Yesterday at ${lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const diffInDays = Math.floor((now - lastSeen) / (1000 * 60 * 60 * 24));
  if (diffInDays < 30) return `${diffInDays} days ago`;

  return 'Offline';
}

// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors(corsConfig));


const sessionMiddleware = session({
  secret: 'COOKIE Пользователя, брать из отдельного файла',
  credentials: true,
  name: 'sid',
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
})

const wrap = (expressMiddleware) => (socket, next) => expressMiddleware(socket.request, {}, next)

app.use(sessionMiddleware);

// Схема валидации для регистрации
const formSchema = Yup.object({
  email: Yup.string().required('Email required'),
  username: Yup.string().required('Name required').min(6, 'Name is too short').max(28, 'Name is too long'),
  password: Yup.string().required('Password required').min(8, 'Password is too short').max(64, 'Password is too long'),
});

// Socket.io

const authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log('Bad request!')
    next(new Error('Not authorized'))
  } else {
    next() //next перенаправляет на следующий вызов (в нашем случае io.on, потому что идет следом за authorizeUser)
  }
} //if user not logged in he has no right to use Socket.io

io.use(wrap(sessionMiddleware))
io.use(authorizeUser)
io.on('connect', (socket) => {
  console.log(socket.request.session.user.username)
  console.log('A user connected:', socket.id) //id is now randomized
});

// Маршруты

// Проверка авторизации
app.get('/auth/me', (req, res) => {

  if (req.session.user) {
    res.json({ resultCode: 0, isAuth: true, id: req.session.user.id });
  } else {
    res.json({ resultCode: 1, isAuth: false });
  }
});

// Регистрация
app.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    await formSchema.validate({ email, password, username });

    db.get('SELECT email FROM Users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      if (user) {
        return res.status(409).json({ error: 'Пользователь с такой почтой уже существует' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Ошибка при хешировании пароля: ' + err.message });
        }

        db.run('INSERT INTO Users (email, password, username) VALUES (?, ?, ?)', [email, hashedPassword, username], function (err) {
          if (err) {
            return res.status(500).json({ error: 'Ошибка базы данных: ' + err.message });
          }

          req.session.user = {
            id: this.lastID,
            email,
            username,
          };

          res.status(201).json({ resultCode: 0, message: 'Пользователь успешно зарегистрирован!', user: req.session.user });
        });
      });
    });
  } catch (validationError) {
    res.status(422).json({ resultCode: 1, errors: validationError.errors });
  }
});

// Логин
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(404).json({ error: 'Invalid password or email' });
      }

      req.session.user = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      res.json({ resultCode: 0, message: 'Login successful', user: req.session.user });
    });
  });
});

// Логаут
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при выходе из системы' });
    }
    res.clearCookie('sid');
    res.json({ resultCode: 0, message: 'Выход выполнен успешно' });
  });
});

// Получение профиля
app.get('/profile/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const currentUserId = req.session.user?.id;

  if (!currentUserId) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  // Обновляем статус текущего пользователя
  await setUserStatus(currentUserId, 'online');

  const { status, lastSeen } = await getUserStatus(userId);

  db.get('SELECT * FROM Users WHERE id = ?', [userId], (err, profile) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!profile) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    return res.json({
      resultCode: 0,
      message: 'Getting profile successful',
      profile: {
        isOwn: currentUserId === userId,
        id: profile.id,
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar,
        dscr: profile.dscr,
        status: status === 'online' ? 'Online' : formatLastSeen(lastSeen),
      },
    });
  });
});

// Получение списка пользователей
app.get('/users', (req, res) => {
  const { sort, filter } = req.query;
  const fullFilter = `${sort} ${filter}`;

  db.all('SELECT * FROM Users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error while getting users data: ' + err.message });
    }

    let users = rows.map((el) => ({
      id: el.id,
      email: el.email,
      username: el.username,
      avatar: el.avatar || null,
      status: el.status_user,
      dscr: el.dscr_user,
    }));

    const getFriends = () => {
      const currentUserId = req.session.user?.id_user;
      db.all(
        'SELECT * FROM friends WHERE (id_user_1 = ? OR id_user_2 = ?) AND id_status = 1',
        [currentUserId, currentUserId],
        (err, friends) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Server ERROR');
          }

          const sortedFriends = users
            .map((user) => {
              const friend = friends.find(
                (friend) =>
                  user.id !== currentUserId &&
                  (friend.id_user_1 === user.id || friend.id_user_2 === user.id)
              );
              return friend ? { ...user, id_status: friend.id_status } : null;
            })
            .filter((user) => user !== null);

          res.json(sortedFriends);
        }
      );
    };

    switch (fullFilter) {
      case 'important false':
        res.json(users);
        break;
      case 'important true':
        getFriends();
        break;
      case 'name false':
        users.sort((a, b) => a.name.localeCompare(b.name));
        res.json(users);
        break;
      case 'name true':
        getFriends();
        break;
      default:
        res.json(users);
    }
  });
});

// Удаление друга
app.delete('/friends/remove/:id', (req, res) => {
  const currentUserId = req.session.user?.id_user;
  const userId = parseInt(req.params.id, 10);

  db.run(
    `DELETE FROM friends 
     WHERE (id_user_1 = ? AND id_user_2 = ?) 
        OR (id_user_1 = ? AND id_user_2 = ?)`,
    [currentUserId, userId, userId, currentUserId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error while removing friend: ' + err.message });
      }
      res.json({ resultCode: 0, message: 'Friend has been successfully removed' });
    }
  );
});

// Отправка запроса дружбы
app.post('/friends/add/:id', (req, res) => {
  const currentUserId = req.session.user?.id_user;
  const userId = parseInt(req.params.id, 10);

  if (!currentUserId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (currentUserId === userId) {
    return res.status(400).json({ error: 'Cannot add yourself as a friend' });
  }

  db.get(
    'SELECT * FROM friends WHERE (id_user_1 = ? AND id_user_2 = ?) OR (id_user_1 = ? AND id_user_2 = ?)',
    [currentUserId, userId, userId, currentUserId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', message: err.message });
      }
      if (row) {
        return res.status(400).json({ error: 'Friend request already exists' });
      }

      db.run(
        'INSERT INTO friends (id_user_1, id_user_2, id_status) VALUES (?, ?, ?)',
        [currentUserId, userId, 0],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Database error', message: err.message });
          }
          res.json({ message: 'Friend request has been sent' });
        }
      );
    }
  );
});

//Просмотр инвайтов (временное решение, нужно сделать так чтоб сервер сам слал инвайты если они поступают)
app.get('/notifications', (req, res) => {
  const currentUserId = req.session.user?.id

  if (!currentUserId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }



})

//Принятие запроса дружбы
app.put('/friends/accept/:id', (req, res) => {
  const currentUserId = req.session.user?.id_user
  const userId = parseInt(req.params.id, 10)

  if (!currentUserId) {
    return res.status(401).json({ error: 'User not authenticated' })
  }
  if (currentUserId === userId) {
    return res.status(400).json({ error: 'Cannot add yourself as a friend' })
  }

  db.run(
    `UPDATE friends
     SET id_status = 1 
     WHERE (id_user_1 = ? AND id_user_2 = ?) 
     OR (id_user_1 = ? AND id_user_2 = ?)`,
    [currentUserId, userId, userId, currentUserId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error while accepting friend: ' + err.message })
      }
      res.json({ resultCode: 0, message: 'Friend has been successfully accepted' })
    }
  )
})

//Отклонение запроса дружбы
app.put('/friends/decline/:id', (req, res) => {
  const currentUserId = req.session.user?.id_user
  const userId = parseInt(req.params.id, 10)

  if (!currentUserId) {
    return res.status(401).json({ error: 'User not authenticated' })
  }
  if (currentUserId === userId) {
    return res.status(400).json({ error: 'Cannot add yourself as a friend' })
  }

  db.run(
    `DELETE FROM friends 
     WHERE (id_user_1 = ? AND id_user_2 = ?) 
        OR (id_user_1 = ? AND id_user_2 = ?)`,
    [currentUserId, userId, userId, currentUserId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error while declining friends request: ' + err.message })
      }
      res.json({ resultCode: 0, message: 'Friend invite has been successfully declined' })
    }
  )
})

app.post('/chat/create', (req, res) => {
  const { creatorId, invitedId } = req.query

  if (!creatorId || !invitedId) return res.status(400).json({ error: 'Missing required parameters' });


})



// Запуск сервера
server.listen(port, () => {
  console.log(`Сервер запущен на порте: ${port}`);
})

