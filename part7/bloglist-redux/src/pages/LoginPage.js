import React from 'react';
import Notification from '../components/Notification';
import LoginForm from '../components/LoginForm';
import {
    Typography as MuiTypography,
    Container as MuiContainer,
    Box as MuiBox,
} from '@material-ui/core';

const LoginPage = () => {
    return (
        <MuiContainer component="main" maxWidth="xs">
            <MuiBox mt={15}>
                <Notification success={false} />

                <MuiTypography component="h1" variant="h5">
                    Sign in
                </MuiTypography>

                <LoginForm />
            </MuiBox>
        </MuiContainer>
    );
};

export default LoginPage;
