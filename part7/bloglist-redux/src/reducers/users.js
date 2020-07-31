import userServices from '../services/users';

export const getAllUsers = () => {
    return async (dispatch) => {
        const users = await userServices.getAll();

        dispatch({
            type: 'GET_ALL_USERS',
            data: users,
        });
    };
};

export const getUserById = (id) => {
    return async (dispatch) => {
        const user = await userServices.getOne(id);

        dispatch({
            type: 'GET_USER_BY_ID',
            data: user,
        });
    };
};

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return action.data;
        case 'GET_USER_BY_ID':
            return state.concat(action.data);
        default:
            return state;
    }
};

export default usersReducer;
