import React from 'react'
import s from './messenger.module.scss'
import { NavLink, Outlet } from 'react-router-dom'
import Servers from './servers/servers'
import WithAuthRedirect from '../../hoc/withAuthRedirect'

const Messenger = (props) => {

    return (
        <section className={s.messenger}>
            <nav className={s.nav}>
                <NavLink to='chats' className={s.private}>
                    Private Messages
                </NavLink>
                <Servers />
            </nav>
            <Outlet />
        </section>
    )
}

export default WithAuthRedirect(Messenger) 