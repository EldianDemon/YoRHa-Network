import React, { useEffect, useRef, useState } from 'react'
import User from './user/user'
import UserSkeleton from './user/userSkeleton/userSkeleton'
import Nav from './nav/nav'

const Users = (props) => {

    console.log('render users')

    return (
        <section className='users'>
            <Nav />
            <ul className='users__list'>
                {
                    props.users.length === 0
                        ?
                        <UserSkeleton iterations={3} />
                        :
                        !props.isDemo &&
                        props.users.map(el =>
                            <li key={el.id} className='users__item'>
                                <User id={el.id} username={el.username} avatar={el.avatar} status={el.status} />
                            </li>)
                }
            </ul>
        </section>
    )
}

export default Users