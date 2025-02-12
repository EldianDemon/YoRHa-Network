const GET_REQUESTS = 'GET_REQUESTS'

const initialState = {
    friendInvites: [],
    news: []
}

const requestsReducer = (state, action) => {
    switch(action.type) {
        default: return state
    }
}

const requestsAction = (requests) => {
    return {type: GET_REQUESTS, requests}
}


const getRequestsThunk = () => (dispatch) => {
    
}

export default requestsReducer