import React from 'react'
import StatusContainer from '../../common/status/statusContainer'
import wallpaperPlaceholder from '../../../img/wallpapers/wallpaper.png'
import ProfileAvatar from './profileAvatar/profileAvatar'
import PostsContainer from './posts/postsContainer'

const Profile = (props) => {

    console.log('render profile')

    return (
        <>
            <section className='profile'>
                <div style={{ backgroundImage: `url(${wallpaperPlaceholder})` }} className='profile__wallpaper'>
                    <ul className='profile__options__list'>
                        {props.isFriend ?
                            <li className='profile__options__item'>
                                <button onClick={() => { props.removeFriend(props.profile.id) }} className='btn profile__options__btn profile__options__btn_f'>
                                    Remove Friend
                                </button>
                            </li> : null}
                        {!props.isFriend && props.isOwner ?
                            <li className='profile__options__item'>
                                <button onClick={() => { props.addFriend(props.profile.id) }} className='btn profile__options__btn'>
                                    Add Friend
                                </button>
                            </li>
                            : null}
                        <button className='btn wallpaper_btn'>
                            <a href="" className='profile__wallpaper__edit__link'>Изменить фон</a>
                        </button>
                    </ul>
                </div>
                <div className='profile__container'>
                    <div className='profile__avatarContainer'>
                        <ProfileAvatar avatar={props.profile.photo} isOwner={props.isOwner} />
                    </div>
                    <div className='profile__body'>
                        <h3 className='profile__name'>{props.profile.name ? props.profile.name : 'Username'}</h3>
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
                        {props.authId !== props.profile.id ?
                            <button className='btn profile__edit__btn'>
                                <a className='profile__edit__link'>Сообщение</a>
                            </button> : null
                        }
                        <button className='btn profile__edit__btn'>
                            <a className='profile__edit__link'>Редактировать профиль</a>
                        </button>
                        <button className='btn profile__more'>
                            <a className='profile__more__link'>Еще</a><i></i>
                        </button>
                    </div>
                </div>
            </section>
            <PostsContainer />
        </>
    )
}

export default Profile