export const initiateTimedNotification = (message) => {
    return (dispatch) => {
        dispatch(setNotification(message));

        setTimeout(() => {
            dispatch(clearNotification());
        }, 3000);
    };
};

const setNotification = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        data: message,
    };
};

const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        data: null,
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
