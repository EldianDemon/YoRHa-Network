import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from '../api/api'

type initialStateType = {
    users: []
}

const initialState: initialStateType = {
    users: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, {payload}) => {
            state.users = payload?.users
        })
    }
})

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async ({ sort, filter }: { sort: string; filter: string }, { dispatch }) => {
        try {
            const data = await API.getUsers(sort, filter)
            if (data.resultCode === 0) {
                console.log(data)
                return { users: data.users }
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export default usersSlice.reducer