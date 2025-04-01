import { API } from "../api/api"

const GET_REQUESTS = 'GET_REQUESTS'

const initialState = {
    requests: [

    ],
}

const requestsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REQUESTS:
            return {
                ...state,
                requests: [...state.requests, action.requests]
            }
        default: return state
    }
}

const requestsAction = (requests) => {
    return {type: GET_REQUESTS, requests}
}


export const checkRequestsThunk = () => (dispatch) => {
        API.checkRequests()
        .then(data => { 
            dispatch(requestsAction(data))
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
}

export default requestsReducer