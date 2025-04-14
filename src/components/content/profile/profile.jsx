import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendFriendRequest, getProfile, removeFriend } from '../../../reducers/profileReducer.ts'
import { getMessages } from '../../../reducers/messagesReducer.js'
import ProfileSkeleton from './profileSkeleton/profileSkeleton.jsx'
import StatusContainer from '../../common/status/statusContainer'
import wallpaperPlaceholder from '../../../img/wallpapers/wallpaper.png'
import ProfileAvatar from './profileAvatar/profileAvatar'
import PostsContainer from './posts/postsContainer'
import FirstMessage from './firstMessage/firstMessage'
import WithAuthRedirect from '../../hoc/withAuthRedirect.js'

const Profile = (props) => {

    const userIdParams = useParams()

    const [isFirstMessage, setFirstMessage] = useState(false)
    const [isFetching, setFetching] = useState(true)

    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profile.profile)

    const fetchProfile = async () => {
        setFetching(true)
        await dispatch(getProfile(userIdParams.userId))
        setFetching(false)
    }

    const goToMessages = (id) => {
        dispatch(getMessages(id))
    }

    useEffect(() => {
        fetchProfile()
    }, [userIdParams.userId])

    console.log('render profile')


    if (isFetching) {
        return <ProfileSkeleton />
    } else {
        return (
            <>
                {isFirstMessage && <FirstMessage username={profile.username} avatar={profile.avatar} />}

                <section className='profile'>
                    <div style={{ backgroundImage: `url(${wallpaperPlaceholder})` }} className='profile__wallpaper'>
                        <ul className='profile__options__list'>
                            {
                                !profile.isOwn && profile.isFriend === 'pending' &&
                                <li className='profile__options__item'>
                                    <button onClick={() => { }} className='btn profile__options__btn'>
                                        Accept Friend
                                    </button>
                                </li>

                            }
                            {
                                !profile.isOwn && profile.isFriend === 'pending' &&
                                <li className='profile__options__item'>
                                    <button onClick={() => { }} className='btn profile__options__btn profile__options__btn_f'>
                                        Decline invite
                                    </button>
                                </li>
                            }
                            {
                                !profile.isOwn && profile.isFriend === true &&
                                <li className='profile__options__item'>
                                    <button onClick={() => { dispatch(removeFriend(profile.id)) }} className='btn profile__options__btn profile__options__btn_f'>
                                        Remove Friend
                                    </button>
                                </li>
                            }
                            {
                                !profile.isOwn && !profile.isFriend &&
                                <li className='profile__options__item'>
                                    <button onClick={() => { dispatch(sendFriendRequest(profile.id)) }} className='btn profile__options__btn'>
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
                            <ProfileAvatar avatar={profile.avatar} isOwner={profile.isOwner} />
                        </div>
                        <div className='profile__body'>
                            <h3 className='profile__name'>{profile.username ? profile.username : '----------'}</h3>
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
                            {!profile.isOwn &&
                                <button onClick={() => { }} className='btn profile__edit__btn'>
                                    Сообщение
                                </button>
                            }
                            {profile.isOwn &&
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
            </>
        )
    }
}

export default WithAuthRedirect(Profile)