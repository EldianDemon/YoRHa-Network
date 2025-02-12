import React, { useState, useEffect } from 'react'
import bellIcon from '../../../img/icons/notification-svgrepo-com.svg'
import bellIconActive from '../../../img/icons/notification-svgrepo-comActive.svg'
import userAvatarPlaceholder from '../../../img/avatars/placeholder2.jpg'
import { NavLink } from 'react-router-dom'

const Bell = (props) => {
    const [isShowed, setShowed] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.bell')) {
                setShowed(false)
            }
        }

        if (isShowed) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isShowed])

    return (
        <div className='bell'>
            <span onClick={() => setShowed(!isShowed)} className='bell__container'>
                <img src={!isShowed ? bellIconActive : bellIcon} width={'30px'} color="#ffffff" className='bell__icon' />
            </span>
            {isShowed && (
                <ul className='bell__list'>
                    {props.requests ? <h4>You have a friend request!</h4> : null}

                    {props.requests?.map(el =>
                        <li className='bell__item'>
                            <NavLink to={`/profile/${props.id}`} className='bell__item__container'>
                                <img src={el.userAvatar ? el.userAvatar : userAvatarPlaceholder} alt="userAvatar" className='profile__avatar bell__item__avatar' />
                                <h5 className='bell__item__head'>{el.userName}</h5>
                            </NavLink>
                            <div className='bell__item__container'>
                                <button className='btn bell__item__btn'>Accept</button>
                                <button className='btn bell__item__btn bell__item__btn_d'>Decline</button>
                            </div>
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default Bell
