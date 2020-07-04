import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ handleNotificationMessage, setUser }) => {
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.loginUser(loginDetails);
            blogService.setToken(user.token);
            window.localStorage.setItem('user', JSON.stringify(user));

            setUser(user);
        } catch (error) {
            handleNotificationMessage('Wrong credentials');

            setTimeout(() => {
                handleNotificationMessage('');
            }, 3000);
        }
    };

    const trackInput = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={loginUser}>
            <div>
                <label htmlFor="username">username: </label>
                <input name="username" onChange={trackInput} />
            </div>
            <div>
                <label htmlFor="password">password: </label>
                <input name="password" type="password" onChange={trackInput} />
            </div>
            <button>login</button>
        </form>
    );
};

export default LoginForm;
