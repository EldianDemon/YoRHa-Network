import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Profile from './profile'
import { addFriendThunk, getProfileThunk, removeFriendThunk } from '../../../reducers/profileReducer.ts'
import { WithAuthRedirect } from '../../hoc/withAuthRedirect'
import ProfileSkeleton from './profileSkeleton/profileSkeleton'

const ProfileContainer = (props) => {

    const userIdParams = useParams()

    const [isFetching, setFetching] = useState(true)

    const fetchProfile = async () => {
        setFetching(true)
        await props.getProfileThunk(userIdParams.userId)
        setFetching(false)
    }

    const addFriend = (id) => {
        props.addFriendThunk(id)
    }
    const removeFriend = (id) => {
        props.removeFriendThunk(id)
    }

    useEffect(() => {
        fetchProfile()
    }, [userIdParams.userId])

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
    }
}

export default compose(connect(mapStateToProps, { getProfileThunk, addFriendThunk, removeFriendThunk }), WithAuthRedirect)(ProfileContainer) 