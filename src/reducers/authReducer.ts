import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from '../api/api'

interface AuthState {
    isAuth: boolean | null
    id: number | null
    authMessage: string | null
}

interface AuthPayload {
    isAuth: boolean
    id: number
    message: string
}

const initialState: AuthState = {
    isAuth: null,
    id: null,
    authMessage: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Обработка getAuth
        builder
            .addCase(getAuth.pending, (state) => {
                state.authMessage = 'Pending authorization'
            })
            .addCase(getAuth.fulfilled, (state, { payload }) => {
                state.isAuth = payload.isAuth
                state.id = payload.id
                state.authMessage = payload.message
            })
            .addCase(getAuth.rejected, (state) => {
                state.isAuth = false
                state.id = null
                state.authMessage = 'Auth request failed'
            })

        // Обработка login
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isAuth = true
                state.id = payload.id
                state.authMessage = 'Authorized'
            })
            .addCase(login.rejected, (state) => {
                state.authMessage = 'Login failed'
            })

        // Обработка logout
        builder
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false
                state.id = null
                state.authMessage = null
            })
    }
})

export const getAuth = createAsyncThunk(
    'auth/getAuth',
    async (_, { rejectWithValue }) => {
        try {
            const data = await API.getAuth()
            if (data.resultCode === 0) {
                return { isAuth: true, id: data.id, message: 'Authorized' }
            }
            throw new Error(data.message || 'Not authorized')
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (formData: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const data = await API.login(formData)
            if (data.resultCode === 0) {
                return { id: data.user.id }
            }
            throw new Error('Invalid email or password')
        } catch (err) {
            return rejectWithValue(
                err.response?.status === 404
                    ? { err: 'Invalid email or password' }
                    : { err: 'Unknown error occurred' }
            )
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await API.logout()
            return { isAuth: false, id: null, authMessage: null }
        } catch (err) {
            console.log(err.message)
        }
        
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (formData: { email: string, password: string }, { dispatch }) => {
        const data = await API.register(formData)
        if (data.resultCode === 0) {
            await dispatch(getAuth())
        }
    }
)

export default authSlice.reducer