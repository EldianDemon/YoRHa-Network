import React from 'react'
import StatusContainer from '../../common/status/statusContainer'
import wallpaperPlaceholder from '../../../img/wallpapers/wallpaper.png'
import ProfileAvatar from './profileAvatar/profileAvatar'
import PostsContainer from './posts/postsContainer'
import { NavLink } from 'react-router-dom'

const Profile = (props) => {

    console.log('render profile')
    return (
        <div>
            <section className='profile'>
                <div style={{ backgroundImage: `url(${wallpaperPlaceholder})` }} className='profile__wallpaper'>
                    <ul className='profile__options__list'>
                        {
                            props.isFriend === 0 &&
                            <li className='profile__options__item'>
                                <button onClick={() => { props.removeFriend(props.profile.id) }} className='btn profile__options__btn profile__options__btn_f'>
                                    Decline invite
                                </button>
                            </li>
                        }
                        {
                            props.isFriend === 1 &&
                            <li className='profile__options__item'>
                                <button onClick={() => { props.removeFriend(props.profile.id) }} className='btn profile__options__btn profile__options__btn_f'>
                                    Remove Friend
                                </button>
                            </li>
                        }
                        {
                            props.isFriend === null && props.isOwner &&
                            <li className='profile__options__item'>
                                <button onClick={() => { props.addFriend(props.profile.id) }} className='btn profile__options__btn'>
                                    Add Friend
                                </button>
                            </li>

                        }

                        <button className='btn wallpaper_btn'>
                            <a href="" className='profile__wallpaper__edit__link'>Изменить фон</a>
                        </button>
                    </ul>
                </div>
                <div className='profile__container'>
                    <div className='profile__avatarContainer'>
                        <ProfileAvatar avatar={props.profile.avatar} isOwner={props.isOwner} />
                    </div>
                    <div className='profile__body'>
                        <h3 className='profile__name'>{props.profile.username ? props.profile.username : '----------'}</h3>
                        <p className='profile__dscr'>

                        </p>
                        <div className='profile__btm'>
                            <div className='profile__location'>
                                <i></i>UserLocation
                            </div>
                            <div className='profile__job'><i></i>UserJob</div>
                            <StatusContainer />
                        </div>
                    </div>
                    <div className='profile_right'>
                        {!props.profile.isOwn &&
                            <button className='btn profile__edit__btn'>
                                <NavLink to={`/messenger/chats/${props.profile.id}`} className='profile__edit__link'>
                                    Сообщение
                                </NavLink>
                            </button>
                        }
                        {props.profile.isOwn &&
                            <button className='btn profile__edit__btn'>
                                <a className='profile__edit__link'>Редактировать профиль</a>
                            </button>
                        }
                        <button className='btn profile__more'>
                            <a className='profile__more__link'>Еще</a><i></i>
                        </button>
                    </div>
                </div>
            </section>
            <PostsContainer />
        </div>
    )
}

export default Profile