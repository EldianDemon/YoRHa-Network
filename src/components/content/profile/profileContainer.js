import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Profile from './profile'
import { addFriendThunk, getProfileThunk, removeFriendThunk } from '../../../reducers/profileReducer.ts'
import { WithAuthRedirect } from '../../hoc/withAuthRedirect'
import ProfileSkeleton from './profileSkeleton/profileSkeleton'

const ProfileContainer = (props) => {

    const [userId, setUserId] = useState(null)
    const [isFetching, setFetching] = useState(true)

    const userIdParams = useParams()

    const fetchProfile = async () => {
        await props.getProfileThunk(userIdParams.userId)
    }

    const addFriend = (id) => {
        props.addFriendThunk(id)
    }
    const removeFriend = (id) => {
        props.removeFriendThunk(id)
    }

    useEffect(() => {

        setFetching(true)
        if (!userIdParams.userId) setUserId(props.authId)
        if (!userId || userId !== userIdParams.userId) {
            setUserId(props.authId)
            fetchProfile()
        }
        setFetching(false)

    }, [userIdParams.userId])

    console.log(isFetching)
    if (isFetching) return <ProfileSkeleton />
    else return <Profile
        profile={props.profile}
        isFriend={props.isFriend}
        isOwner={props.authId !== props.profile.id}
        addFriend={addFriend}
        removeFriend={removeFriend}
    />
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        authId: state.auth.id,
        isFriend: state.profile.isFriend
    }
}

export default compose(connect(mapStateToProps, { getProfileThunk, addFriendThunk, removeFriendThunk }), WithAuthRedirect)(ProfileContainer) 