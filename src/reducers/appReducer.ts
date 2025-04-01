const SET_INIT = 'SET_INIT' as const
const SET_DEMO = 'SET_DEMO' as const

interface AppState {
    isDemo: boolean
}

const initialState: AppState = {
    isDemo: false,
};

interface SetInitAction {
    type: typeof SET_INIT
    status: boolean
}

interface SetDemoAction {
    type: typeof SET_DEMO
    status: boolean
}

type AppActions = SetInitAction | SetDemoAction

const appReducer = (state = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case SET_DEMO:
            return {
                ...state,
                isDemo: action.status,
            };
        default:
            return state;
    }
}

export const setDemo = (status: boolean): SetDemoAction => ({
    type: SET_DEMO,
    status,
})

export default appReducer