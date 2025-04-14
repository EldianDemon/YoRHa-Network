import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { loginRef } from '../../../utilities/focusOn'
import avatarPlaceholder from '../../../img/avatars/placeholder2.jpg'
import s from './auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../../reducers/authReducer.ts'

const Auth = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const profile = useSelector((state) => state.profile.profile)


    const location = useLocation()

    useEffect(() => {
        dispatch(getAuth())
    }, [])



    console.log('render auth')
    return (
        <div className={s.auth}>
            {
                !isAuth && location.pathname !== '/login' &&
                <NavLink to='/login' ref={loginRef ? loginRef : null} className={s.link}>
                    Login
                </NavLink>
            }
            {
                isAuth &&
                <NavLink to='/account'>
                    <img src={profile.avatar ? profile.avatar : avatarPlaceholder} alt="avatar" className={`profile__avatar ${s.avatar}`} />
                </NavLink>
            }
        </div>
    )
}

export default Auth


