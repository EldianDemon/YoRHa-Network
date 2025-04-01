import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import avatarPlaceholder from '../../../img/avatars/placeholder2.jpg'
import s from './auth.module.scss'

const Auth = (props) => {

    useEffect(() => {
        props.waitFetch()
    }, [])

    const location = useLocation()

    console.log('render auth')
    return (
        <div className={s.auth}>
            {
                !props.isAuth && location.pathname !== '/login' &&
                <NavLink to='/login' ref={props.loginRef ? props.loginRef : null} className={s.link}>
                    Login
                </NavLink>
            }
            {
                props.isAuth &&
                <NavLink to='/account/main'>
                    <img src={props.avatar ? props.avatar : avatarPlaceholder} alt="avatar" className={`profile__avatar ${s.avatar}`} />
                </NavLink>
            }
        </div>
    )
}

export default Auth


