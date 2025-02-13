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

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3006;

// Инициализация базы данных
const db = new sqlite3.Database(path.resolve(__dirname, 'yorhabase.db'), (err) => {
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

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(session({
  secret: 'COOKIE Пользователя, брать из отдельного файла',
  credentials: true,
  name: 'sid',
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === 'production',
    httpOnly: true,
    expires: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
  },
}));

// Схема валидации для регистрации
const formSchema = Yup.object({
  email: Yup.string().required('Email required'),
  name: Yup.string().required('Name required').min(6, 'Name is too short').max(28, 'Name is too long'),
  password: Yup.string().required('Password required').min(8, 'Password is too short').max(64, 'Password is too long'),
});

// Socket.io
io.on('connect', (socket) => {
  console.log('A user connected:', socket.id);
});

// Маршруты

// Проверка авторизации
app.get('/auth/me', (req, res) => {
  if (req.session.user) {
    res.json({ resultCode: 0, isAuth: true, id: req.session.user.id_user });
  } else {
    res.json({ resultCode: 1, isAuth: false });
  }
});

// Регистрация
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    await formSchema.validate({ email, password, name });

    db.get('SELECT email FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (user) {
        return res.status(409).json({ error: 'Пользователь с такой почтой уже существует' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Ошибка при хешировании пароля: ' + err.message });
        }

        db.run('INSERT INTO users (email, password, name_user) VALUES (?, ?, ?)', [email, hashedPassword, name], function (err) {
          if (err) {
            return res.status(500).json({ error: 'Ошибка базы данных: ' + err.message });
          }

          req.session.user = {
            id_user: this.lastID,
            email,
            name,
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

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
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
        id_user: user.id_user,
        email: user.email,
        name_user: user.name_user,
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
app.get('/profile/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const currentUserId = req.session.user?.id_user;

  if (!currentUserId) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  db.get('SELECT * FROM users WHERE id_user = ?', [userId], (err, profile) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!profile) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    if (currentUserId === userId) {
      return res.json({
        resultCode: 0,
        message: 'Getting profile successful',
        profile,
      });
    }

    db.get(
      'SELECT * FROM friends WHERE (id_user_1 = ? AND id_user_2 = ?) OR (id_user_1 = ? AND id_user_2 = ?)',
      [currentUserId, userId, userId, currentUserId],
      (err, friendRelation) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          resultCode: 0,
          message: 'Getting profile successful',
          profile,
          isFriend: !!friendRelation,
        });
      }
    );
  });
});

// Получение списка пользователей
app.get('/users', (req, res) => {
  const { sort, filter } = req.query;
  const fullFilter = `${sort} ${filter}`;

  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error while getting users data: ' + err.message });
    }

    let users = rows.map((el) => ({
      id: el.id_user,
      email: el.email,
      name: el.name_user,
      secondName: el.name2_user,
      photo: el.photo_user || null,
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

// Добавление друга
app.post('/friends/add/:id', (req, res) => {
  const currentUserId = req.session.user?.id_user;
  const userId = parseInt(req.params.id, 10);

  if (!currentUserId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (currentUserId === userId) {
    return res.status(400).json({ error: 'Cannot add yourself as a friend' });
  }

  db.run(
    'INSERT INTO friends (id_user_1, id_user_2, id_status) VALUES (?, ?, ?) ON CONFLICT(id_user_1, id_user_2) DO UPDATE SET id_status = ?',
    [currentUserId, userId, 0, 0],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', message: err.message });
      }
      res.json({ message: 'Friend request has been sent' });
    }
  );
});

// Запуск сервера
server.listen(port, () => {
  console.log(`Сервер запущен на порте: ${port}`);
});