import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../api/api"

type profileType = {
    isOwn: null | boolean,
    id: null | number,
    username: null | string,
    email: null | string,
    avatar: null | string,
    dscr: null | string
    status: null | string,
    isFriend: null | number
}
type initialStateType = {
    profile: profileType,
}

const initialState: initialStateType = {
    profile: {
        isOwn: null,
        id: null,
        username: null,
        email: null,
        avatar: null,
        dscr: null,
        status: null,
        isFriend: null
    },
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, () => {
                console.log('fetching Profile')
            })
            .addCase(getProfile.fulfilled, (state, { payload }) => {
                state.profile = payload?.profile
            })
            .addCase(getProfile.rejected, () => {
                console.log('error while getting Profile')
            })

        builder
            .addCase(removeFriend.fulfilled, (state, { payload }) => {
                state.profile.isFriend = payload?.isFriend
            })
    }
})

export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (id) => {
        try {
            const data = await API.getProfile(id)
            if (data.resultCode === 0) {
                return { profile: data.profile }

            }
            console.log(data.profile)
        } catch (err) {
            console.log('Ошибка запроса профиля: ' + err)
        }
    }
)

export const sendFriendRequest = createAsyncThunk(
    'profile/sendFriendRequest',
    async (id) => {
        try {
            const data = await API.addFriend(id)
            if (data?.resultCode === 0) {
                return { isFriend: data.isFriend }
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const removeFriend = createAsyncThunk(
    'profile/removeFriend',
    async (id) => {
        try {
            const data = await API.removeFriend(id)
            if (data?.resultCode === 0) {
                return { isFriend: data.isFriend }
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export default profileSlice.reducer