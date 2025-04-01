import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import s from './servers.module.scss'
import m from '../messenger.module.scss'

const Servers = () => {

    const serversPlaceholder = [
        { id: 1, name: 'Server 1' },
        { id: 2, name: 'Server 2' },
        { id: 3, name: 'Server 3' },
        { id: 4, name: 'Server 4' },
        { id: 5, name: 'Server 5' },
    ]

    return (
        <section className={s.container}>
            <ul className={s.list}>
                {
                    serversPlaceholder.map(el =>
                        <li className={s.item}>
                            <NavLink to={`servers/${el.id}`}>
                                {el.name}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}

export default Servers