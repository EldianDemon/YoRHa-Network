import { API } from '../api/api'

const GET_AUTH = 'GET_AUTH'

type initialStateType = {
    isAuth: null | boolean,
    id: null | number,
    authMessage: null | string
}
type authAction = {
    type: string,
    auth: boolean,
    id: null | number,
    message: string
}

const initialState: initialStateType = {
    isAuth: null,
    id: null,
    authMessage: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH:
            return {
                ...state,
                isAuth: action.auth,
                id: action.id,
                authMessage: action.message
            }
        default: return state
    }
}

const getAuthActionCreator = (auth: boolean, id: number | null, message: string): authAction => {
    return { type: GET_AUTH, auth, id, message }
}

export const getAuthThunkCreator = () => (dispatch) => {
    API.getAuth()
        .then(data => {
            if (data.resultCode === 0) dispatch(getAuthActionCreator(data.isAuth, data.id, 'Authorized'))
            dispatch(getAuthActionCreator(data.isAuth, data.id, 'You are not authorized'))
        })
        .catch(err => {
            dispatch(getAuthActionCreator(false, null, err.message))
            console.log(err)
        })
}

export const getRegisterThunkCreator = (formData) => (dispatch) => {
    
    return API.register(formData)
    .then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthThunkCreator())
        } else {
            return false
        }
    })
    .catch(error => {
        return error
    })
}

export const getLoginThunkCreator = (formData) => (dispatch) => {

    return API.login(formData)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthActionCreator(true, data.user.id, 'Authorized'))
            } else {
                return false
            }
        })
        .catch(error => {
            if (error.status === 404) return { error: 'Почтовый адрес или пароль неверен' }
            return { error: 'Неизвестная ошибка' }
        })
}

export const logoutThunkCreator = () => (dispatch) => {
    API.logout()
    .then(() => {
        dispatch(getAuthThunkCreator())
    })
    .catch(err => {
        console.log(err)
    })
}

export default authReducer