import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/auth';
import userReducer from './reducers/users';
import blogReducer from './reducers/blogs';
import notificationReducer from './reducers/notifications';

const reducer = combineReducers({
    authenticatedUser: authReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
