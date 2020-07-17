import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const style = {
    button: {
        borderRadius: '0.25rem',
        border: '1px solid black',
    },
};

const LoginForm = ({ handleUserLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const trackInput = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUserLogin(credentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">username: </label>
                <input name="username" id="username" onChange={trackInput} />
            </div>
            <div>
                <label htmlFor="password">password: </label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    onChange={trackInput}
                />
            </div>

            <Button
                label="login"
                id="login-button"
                customStyle={style.button}
            />
        </form>
    );
};

LoginForm.propTypes = {
    handleUserLogin: PropTypes.func.isRequired,
};

export default LoginForm;
