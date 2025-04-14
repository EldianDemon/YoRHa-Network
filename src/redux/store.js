import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../reducers/appReducer.ts'
import authReducer from '../reducers/authReducer.ts'
import messagesReducer from '../reducers/messagesReducer.js'
import profileReducer from '../reducers/profileReducer.ts'
import usersReducer from '../reducers/usersReducer.ts'
import requestsReducer from '../reducers/requestsReducer.js'

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        messages: messagesReducer,
        profile: profileReducer,
        users: usersReducer,
        requests: requestsReducer
    }
})
