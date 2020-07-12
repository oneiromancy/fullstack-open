const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: message,
    };
};

const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: null,
    };
};

export const setNotification = (message, seconds) => {
    return async (dispatch) => {
        dispatch(showNotification(message));

        setTimeout(() => dispatch(hideNotification()), seconds * 1000);
    };
};

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data;
        case 'HIDE_NOTIFICATION':
            return action.data;
        default:
            return state;
    }
};

export default notificationReducer;
