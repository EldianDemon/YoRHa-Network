import { API } from "../api/api"

const GET_PROFILE = 'GET_PROFILE'
const SET_FRIEND = 'SET_FRIEND'


type profileType = {
    id: null | number,
    email: null | string,
    name: null | string,
    name2: null | string,
    photo: null | string,
    status: null | string,
    dscr: null | string
}
type initialStateType = {
    profile: null | profileType,
    isFriend: boolean
}

const initialState: initialStateType = {
    profile: {
        id: null,
        email: null,
        name: null,
        name2: null,
        photo: null,
        status: null,
        dscr: null,
    },
    isFriend: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE: return {
            ...state,
            profile: {
                ...state.profile,
                id: action.id_user,
                email: action.email,
                name: action.name_user,
                name2: action.name2_user,
                photo: action.photo_user,
                status: action.status_user,
                dscr: action.dscr_user
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

const getProfile = (profile, isFriend) => {
    return { type: GET_PROFILE, ...profile, isFriend }
}
const setFriend = (status) => {
    return { type: SET_FRIEND, status }
}

export const getProfileThunk = (id) => (dispatch) => {
    API.getProfile(id)
        .then(data => {
            if (data.resultCode === 0) dispatch(getProfile(data.profile, data.isFriend))
            console.log(data)
        })
        .catch(error => {
            console.log('Ошибка запроса профиля: ' + error)
        })
}

export const addFriendThunk = (id) => (dispatch) => {
    API.addFriend(id)
        .then(data => {
            console.log(data.message)
            dispatch(setFriend(true))
        })
        .catch(error => {
            console.log(error)
        })
}
export const removeFriendThunk = (id) => (dispatch) => {
    API.removeFriend(id)
        .then(data => {
            console.log(data.message)
            dispatch(setFriend(false))
        })
        .catch(error => {
            console.log(error)
        })
}

export default profileReducer