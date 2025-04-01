import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './style.scss'
import NoMatch from './components/content/noMatch/noMatch'
import Header from './components/header/header'
import Nav from './components/nav/nav'
import News from './components/content/news/news'
import ProfileContainer from './components/content/profile/profileContainer'
import UsersContainer from './components/content/users/usersContainer'
import LoginContainer from './components/content/login/loginContainer'
import RegisterContainer from './components/content/register/registerContainer'
import Messenger from './components/content/messenger/messenger'
import AccountContainer from './components/content/account/accountContainer'
import Servers from './components/content/messenger/servers/servers'
import Server from './components/content/messenger/servers/server/server'
import Chats from './components/content/messenger/chats/chats'
import Chat from './components/content/messenger/chats/chat/chat'

const App = () => {

  const location = useLocation()
  const locator = (...paths) => {
    return paths
  }

  return (
    <div className='App'>
      <Header />
      <div className='container App__container'>
        {!locator('/login', '/register', '/account/main').includes(location.pathname) &&
          <div className='leftContainer'>
            <Nav />
          </div>
        }
        <div className='content'>
          <Routes>
            <Route path='/register' element={<RegisterContainer />} />
            <Route path='/login' element={<LoginContainer />} />
            <Route path='/account/main' element={<AccountContainer />} />
            <Route path='/' element={<Navigate to='/messenger' />} />
            <Route path='*' element={<NoMatch />} />
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/messenger' element={<Messenger />}>
              <Route path='chats' element={<Chats />}>
                <Route path=':chatId' element={<Chat />} />
              </Route>
              <Route path='servers'>
                <Route index element={<Servers />} />
                <Route path=':serverId' element={<Server />} />
              </Route>
            </Route>
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/news' element={<News />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
