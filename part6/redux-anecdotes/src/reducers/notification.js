export const setNotification = (message) => {
    const action = {
        type: 'SET_NOTIFICATION',
        data: message,
    };

    return action;
};

export const clearNotification = () => {
    const action = {
        type: 'CLEAR_NOTIFICATION',
        data: null,
    };

    return action;
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
