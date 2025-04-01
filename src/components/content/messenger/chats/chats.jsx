import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import s from './chats.module.scss'
import useSocketSetup from '../../../../hooks/useSocketSetup'

const Chats = () => {

    useSocketSetup()

    const chatsPlaceholder = [
        { id: 1, name: 'Antony', isOwner: false, message: 'Some message here', messageDate: 'must be a date', isViewed: false },
        { id: 2, name: 'Mark', isOwner: false, message: 'Some message here', messageDate: 'must be a date', isViewed: false },
        { id: 3, name: 'Josh', isOwner: false, message: 'Some message here', messageDate: 'must be a date', isViewed: false },
        { id: 4, name: 'Jesse', isOwner: false, message: 'Some message here', messageDate: 'must be a date', isViewed: false },
        { id: 5, name: 'Rex', isOwner: false, message: 'Some message here', messageDate: 'must be a date', isViewed: false },
    ]

    return (
        <section className={s.layout}>
            <ul className={s.list}>
                {chatsPlaceholder.map(el =>
                    <li className={s.item}>
                        <NavLink to={`${el.id}`} className={s.link}>
                            <h4 className={s.username}>{el.name}</h4>
                            <div className={s.content}>
                                <span className={s.content__owner}>
                                    {el.isOwner && 'Вы: '}
                                </span>
                                <span className={s.content__message}>
                                    {el.message}
                                </span>
                            </div>
                            <span className={el.date}>
                                {el.messageDate}
                            </span>
                        </NavLink>
                    </li>
                )}
            </ul>
            <Outlet />
        </section>
    )
}

export default Chats