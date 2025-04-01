import React from 'react'
import s from './messenger.module.scss'
import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import Servers from './servers/servers'

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

export default Messenger