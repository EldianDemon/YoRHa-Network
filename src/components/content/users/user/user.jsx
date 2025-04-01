import React from 'react'
import placeholder from '../../../../img/avatars/placeholder2.jpg'
import { NavLink } from 'react-router-dom'

const User = ({ id, status, username, avatar, dscr }) => {
    return (
        <NavLink to={`/profile/${id}`}>
            <div className='users__item__container'>
                <img src={avatar ? avatar : placeholder} alt="" className='profile__avatar users__item__avatar' />
                <h3 className='users__item__name'>{username}</h3>
                {status}
            </div>
        </NavLink>
    )
}

export default User