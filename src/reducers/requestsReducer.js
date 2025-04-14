import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../api/api"

const initialState = {
    requests: [],
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequests.fulfilled, (state, { payload }) => {
                state.requests = payload.requests
            })
    }
})

export const getRequests = createAsyncThunk(
    'requests/getRequests',
    async () => {
        try {
            const data = await API.getRequests()
            if (data.resultCode === 0) {
                return { requests: data.requests }
            }
        } catch (err) {
            console.log(err)
            return {
                requests: [
                    { id: 0, userName: 'testUser1', userAvatar: null },
                    { id: 1, userName: 'testUser2', userAvatar: null },
                    { id: 2, userName: 'testUser3', userAvatar: null },
                    { id: 3, userName: 'testUser4', userAvatar: null },
                ]
            }
        }
    }
)

export default requestsSlice.reducer