import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import NoMatch from './components/content/noMatch/noMatch'
import Header from './components/header/header'
import Nav from './components/nav/nav'
import News from './components/content/news/news'
import Profile from './components/content/profile/profile'
import Users from './components/content/users/users'
import Login from './components/content/login/login'
import Register from './components/content/register/register'
import Messenger from './components/content/messenger/messenger'
import Account from './components/content/account/account'
import Main from './components/content/account/main/main'
import Servers from './components/content/messenger/servers/servers'
import Server from './components/content/messenger/servers/server/server'
import Chats from './components/content/messenger/chats/chats'
import Chat from './components/content/messenger/chats/chat/chat'

const App = () => {

  const navigate = useNavigate()

  const location = useLocation()
  const locator = (...paths) => {
    return paths
  }

  useEffect(() => {
    if (location.pathname === '/account') navigate('/account/main')
  }, [location.pathname])

  return (
    <div className='App'>
      <Header />
      <div className='container App__container'>
        {!locator('/login', '/register').includes(location.pathname) && !location.pathname.startsWith('/account') &&
          <div className='leftContainer'>
            <Nav />
          </div>
        }
        <div className='content'>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/account' element={<Account />} >
              <Route path='main' element={<Main />} />
              <Route path='personal' />
              <Route path='safety' />
            </Route>

            <Route path='/' element={<Navigate to='/messenger' />} />
            <Route path='*' element={<NoMatch />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/messenger' element={<Messenger />}>
              <Route path='chats' element={<Chats />}>
                <Route path=':chatId' element={<Chat />} />
              </Route>
              <Route path='servers'>
                <Route index element={<Servers />} />
                <Route path=':serverId' element={<Server />} />
              </Route>
            </Route>
            <Route path='/users' element={<Users />} />
            <Route path='/news' element={<News />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
