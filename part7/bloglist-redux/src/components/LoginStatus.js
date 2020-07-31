import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/auth';
import {
    Box as MuiBox,
    Typography as MuiTypography,
    Button as MuiButton,
} from '@material-ui/core';

const LoginStatus = () => {
    const styles = {
        loginStatus: {
            marginRight: '1rem',
            fontSize: '0.85rem',
        },
    };

    const authenticatedUser = useSelector(
        ({ authenticatedUser }) => authenticatedUser,
    );
    const dispatch = useDispatch();

    return (
        <>
            {authenticatedUser && (
                <MuiBox display="flex" alignItems="center">
                    <MuiTypography style={styles.loginStatus}>
                        <span role="img" aria-label="peeping eyes emoji">
                            &#128064;
                        </span>{' '}
                        {authenticatedUser.username} is logged in
                    </MuiTypography>

                    <MuiButton
                        onClick={() => {
                            dispatch(logoutUser());
                        }}
                        variant="outlined"
                        color="secondary"
                    >
                        logout
                    </MuiButton>
                </MuiBox>
            )}
        </>
    );
};

export default LoginStatus;
