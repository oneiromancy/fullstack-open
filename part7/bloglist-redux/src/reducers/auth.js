import loginServices from '../services/auth';
import { initiateTimedNotification } from './notifications';

export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginServices.loginUser(username, password);

            if (user) {
                window.localStorage.setItem('user', JSON.stringify(user));

                dispatch({
                    type: 'LOGIN_USER',
                    data: user,
                });
            }
        } catch (e) {
            dispatch(initiateTimedNotification('Wrong Credentials'));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('user');

        await dispatch({
            type: 'LOGOUT_USER',
            data: null,
        });
    };
};

const userReducer = (
    state = JSON.parse(localStorage.getItem('user')),
    action,
) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data;
        case 'LOGOUT_USER':
            return null;
        default:
            return state;
    }
};

export default userReducer;
