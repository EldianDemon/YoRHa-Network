import { API } from "../api/api"

const GET_PROFILE = 'GET_PROFILE'
const SET_FRIEND = 'SET_FRIEND'

type profileType = {
    isOwn: null | boolean,
    id: null | number,
    email: null | string,
    name: null | string,
    avatar: null | string,
    status: null | string,
    dscr: null | string
}
type initialStateType = {
    profile: null | profileType,
}

const initialState: initialStateType = {
    profile: {
        isOwn: null,
        id: null,
        email: null,
        name: null,
        avatar: null,
        status: null,
        dscr: null,
    },
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE: return {
            ...state,
            profile: {
                ...state.profile,
                isOwn: action.isOwn,
                id: action.id,
                email: action.email,
                username: action.username,
                avatar: action.avatar,
                status: action.status,
                dscr: action.dscr
            },
            isFriend: action.isFriend 
        }
        case SET_FRIEND: return {
            ...state,
            isFriend: action.status
        }

        default: return state
    }
}

const getProfile = (profile) => {
    return { type: GET_PROFILE, ...profile}
}
const setFriend = (status) => {
    return { type: SET_FRIEND, status }
}

export const getProfileThunk = (id) => (dispatch) => {

    API.getProfile(id)
        .then(data => {
            if (data.resultCode === 0) dispatch(getProfile(data.profile))
                console.log(data.profile)
        })
        .catch(error => {
            console.log('Ошибка запроса профиля: ' + error)
        })
}

export const addFriendThunk = (id) => (dispatch) => {
    API.addFriend(id)
        .then(() => {
            dispatch(setFriend(0))
        })
        .catch(error => {
            console.log(error)
        })
}
export const removeFriendThunk = (id) => (dispatch) => {
    API.removeFriend(id)
        .then(data => {
            console.log(data.message)
            dispatch(setFriend(null))
        })
        .catch(error => {
            console.log(error)
        })
}

export default profileReducer