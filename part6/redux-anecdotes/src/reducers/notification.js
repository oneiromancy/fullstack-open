export const setNotification = (message, timespan) => {
    return async (dispatch) => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            data: message,
        });

        await setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
                data: null,
            });
        }, timespan);
    };
};

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data;
        case 'CLEAR_NOTIFICATION':
            return action.data;
        default:
            return state;
    }
};

export default notificationReducer;
