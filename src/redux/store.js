import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'
import appReducer from '../reducers/appReducer.ts'
import authReducer from '../reducers/authReducer.ts'
import usersReducer from '../reducers/usersReducer.ts'
import profileReducer from '../reducers/profileReducer.ts'
import requestsReducer from '../reducers/requestsReducer.js'

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    requests: requestsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store