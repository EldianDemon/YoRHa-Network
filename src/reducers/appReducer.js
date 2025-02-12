const SET_INIT = 'SET_INIT'

const initialState = {
    init: false,
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INIT: return {
            ...state,
            init: action.status
        }
        default: return state
    }
}

export const setInit = (status) => {
    return {type: SET_INIT, status}
}

export default appReducer