import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import blogService from '../services/blogs';
import LoginForm from './LoginForm';
import Notification from './Notification';

const LoginPage = ({ handleUserState }) => {
    const [notificationMessage, setNotificationMessage] = useState(null);

    const loginUser = async (credentials) => {
        try {
            const user = await loginService.loginUser(credentials);

            // storing jwt token into src/services/blog to help with CRUD blog operations
            blogService.setToken(user.token);

            // persisting user in localstorage
            window.localStorage.setItem('user', JSON.stringify(user));

            handleUserState(user);
        } catch (error) {
            initiateTimedNotification('Wrong credentials');
        }
    };

    const initiateTimedNotification = (message) => {
        setNotificationMessage(message);

        setTimeout(() => {
            setNotificationMessage('');
        }, 3000);
    };

    return (
        <div>
            <Notification message={notificationMessage} />

            <h1>Login to application</h1>

            <LoginForm handleUserLogin={loginUser} />
        </div>
    );
};

LoginPage.propTypes = {
    handleUserState: PropTypes.func.isRequired,
};

export default LoginPage;
