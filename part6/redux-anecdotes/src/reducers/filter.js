export const setVisibilityFilter = (query) => {
    const action = {
        type: 'SET_VISIBILITY_FILTER',
        query,
    };

    return action;
};

const showAll = () => {
    const action = {
        type: 'SHOW_ALL',
        query: null,
    };

    return action;
};

const initialState = showAll();

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return {
                ...state,
                type: action.type,
                query: action.query,
            };
        default:
            return state;
    }
};

export default filterReducer;
