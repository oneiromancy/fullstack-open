import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/auth';
import {
    TextField as MuiTextField,
    Button as MuiButton,
} from '@material-ui/core';

const LoginForm = () => {
    const dispatch = useDispatch();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = credentials;
        dispatch(loginUser(username, password));
    };

    return (
        <form onSubmit={handleSubmit}>
            <MuiTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Username"
                name="username"
                id="username"
                onChange={trackInput}
            />

            <MuiTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                name="password"
                onChange={trackInput}
            />

            <MuiButton
                type="submit"
                label="login"
                fullWidth
                id="login-button"
                variant="contained"
                color="secondary"
            >
                Sign In
            </MuiButton>
        </form>
    );
};

export default LoginForm;
