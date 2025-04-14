import React, { useState, useEffect } from 'react'
import userAvatarPlaceholder from '../../../img/avatars/placeholder2.jpg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests } from '../../../reducers/requestsReducer'

const Bell = (props) => {

    const [isShowed, setShowed] = useState(false)

    const requests = useSelector((state) => state.requests.requests)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRequests())
    }, [])

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

    console.log('render bell')

    return (
        <div className='bell'>
            <span onClick={() => setShowed(!isShowed)} className='bell__container'>
                <svg fill={isShowed ? "#e8a413" : ""} height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 300 300"><g><g><path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003 S232.835,0,149.996,0z M149.999,232.951c-10.766,0-19.499-8.725-19.499-19.499h38.995 C169.497,224.226,160.765,232.951,149.999,232.951z M215.889,193.9h-0.005v-0.001c0,7.21-5.843,7.685-13.048,7.685H97.16 c-7.208,0-13.046-0.475-13.046-7.685v-1.242c0-5.185,3.045-9.625,7.42-11.731l4.142-35.753c0-26.174,18.51-48.02,43.152-53.174 v-13.88c0-6.17,5.003-11.173,11.176-11.173c6.17,0,11.173,5.003,11.173,11.173V92c24.642,5.153,43.152,26.997,43.152,53.174 l4.142,35.758c4.375,2.109,7.418,6.541,7.418,11.726V193.9z" /></g></g></svg>
            </span>
            {isShowed && (
                <ul className='bell__list'>
                    {requests ? <h4>You have a friend request!</h4> : null}

                    {requests?.map(el =>
                        <li className='bell__item'>
                            <NavLink to={`/profile/ `} className='bell__item__container'>
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
