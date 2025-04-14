import { createSlice } from '@reduxjs/toolkit'

interface AppState {
    isDemo: boolean
}

const initialState: AppState = {
    isDemo: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDemo: (state) => {
            state.isDemo = !state.isDemo
        }
    }
})

export const { setDemo } = appSlice.actions

export default appSlice.reducer