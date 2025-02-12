import React from 'react'
import placeholder from '../../../../img/avatars/placeholder2.jpg'
import { NavLink } from 'react-router-dom'

const User = ({ id, id_status, name, photo, dscr }) => {
    return (
        <NavLink to={`/profile/${id}`}>
            <div className='users__item__container'>
                <img src={photo ? photo : placeholder} alt="" className='profile__avatar users__item__avatar' />
                <h3 className='users__item__name'>{name}</h3>
                {id_status}
            </div>
        </NavLink>
    )
}

export default User