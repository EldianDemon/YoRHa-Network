import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../api/api"

const initialState = {
    messages: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(getMessages.pending, () => {
                console.log('fetching messages')
            })
            .addCase(getMessages.fulfilled, (state, { payload }) => {
                state.messages = payload.messages
            })
            .addCase(getMessages.rejected, () => {
                console.log('something went wrong while getting messages')
            })

    }
})

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async () => {
        try {
            const data = await API.getMessages(id)
            console.log(data)
            if (data.resultCode === 0) {
                return { messages: data.messages }
            } else if (data.resultCode === 2) {
                console.log(data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export default messagesSlice.reducer