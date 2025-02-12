import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'
import appReducer from '../reducers/appReducer'
import authReducer from '../reducers/authReducer.ts'
import usersReducer from '../reducers/usersReducer.ts'
import profileReducer from '../reducers/profileReducer.ts'

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store