import { API } from '../api/api'
import { setInit } from './appReducer.ts'
import { getAuthThunkCreator } from './authReducer.ts'

const CLEAR_CACHE = 'CLEAR_CACHE'
const GET_USERS = 'GET_USERS'

type initialStateType = {
    users: []
}

const initialState: initialStateType = {
    users: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: JSON.parse(JSON.stringify(action.users))
            }
        case CLEAR_CACHE:
            return initialState
        default: return state
    }
}

export const clearCache = () => {
    return { type: CLEAR_CACHE }
}

const getUsersActionCreator = (users) => {
    return { type: GET_USERS, users }
}

export const getUsersThunkCreator = (sort, filter) => (dispatch) => {

    dispatch(setInit(true))
    API.getUsers(sort, filter)
        .then(data => {
            console.log(data)
            dispatch(getUsersActionCreator(data))
        })
        .catch(err => {
            dispatch(getAuthThunkCreator())
            console.error('Ошибка:', err.message)
        })
        .finally(() => {dispatch(setInit(false))})
}

export default usersReducer