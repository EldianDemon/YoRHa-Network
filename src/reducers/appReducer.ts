const SET_INIT = 'SET_INIT' as const;
const SET_DEMO = 'SET_DEMO' as const;

interface AppState {
    init: boolean;
    isDemo: boolean;
}

const initialState: AppState = {
    init: false,
    isDemo: false,
};

interface SetInitAction {
    type: typeof SET_INIT;
    status: boolean;
}

interface SetDemoAction {
    type: typeof SET_DEMO;
    status: boolean;
}

// Объединяем все типы действий
type AppActions = SetInitAction | SetDemoAction;

const appReducer = (state = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case SET_INIT:
            return {
                ...state,
                init: action.status,
            };
        case SET_DEMO:
            return {
                ...state,
                isDemo: action.status,
            };
        default:
            return state;
    }
};

export const setInit = (status: boolean): SetInitAction => ({
    type: SET_INIT,
    status,
});

export const setDemo = (status: boolean): SetDemoAction => ({
    type: SET_DEMO,
    status,
});

export default appReducer;