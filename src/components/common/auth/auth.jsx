import { NavLink } from 'react-router-dom'
import avatarPlaceholder from '../../../img/avatars/placeholder2.jpg'

const Auth = (props) => {

    console.log('render auth')
    return (
        <div className='auth'>
            {!props.isAuth && props.location.pathname !== '/login' ?
                <NavLink to='/login' ref={props.loginRef ? props.loginRef : null} className='auth__link'>
                    Login
                </NavLink>
                :
                <NavLink to='/account/main'>
                    <img src={props.avatar ? props.avatar : avatarPlaceholder} alt="avatar" className='profile__avatar auth__avatar' />
                </NavLink>}
        </div>
    )
}

export default Auth


