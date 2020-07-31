import React from 'react';
import LoginStatus from './LoginStatus';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar as MuiAppBar,
    Toolbar as MuiToolbar,
    Typography as MuiTypography,
} from '@material-ui/core';

const Navbar = () => {
    const location = useLocation();

    const styles = {
        container: {
            backgroundColor: 'black',
        },
        heading: {
            fontSize: '1.1rem',
            textDecoration: 'none',
            textTransform: 'uppercase',
        },
        blogsHeading: {
            marginRight: '3rem',
            color: `${
                location.pathname.endsWith('/') ||
                location.pathname.startsWith('/blogs')
                    ? 'red'
                    : 'white'
            }`,
        },
        usersHeading: {
            flexGrow: 1,
            color: `${
                location.pathname.startsWith('/users') ? 'red' : 'white'
            }`,
        },
    };

    return (
        <MuiAppBar position="relative" style={styles.container}>
            <MuiToolbar variant="dense">
                <MuiTypography
                    component={Link}
                    to="/"
                    variant="h2"
                    style={{ ...styles.heading, ...styles.blogsHeading }}
                >
                    blogs
                </MuiTypography>
                <MuiTypography
                    component={Link}
                    to="/users"
                    variant="h2"
                    style={{ ...styles.heading, ...styles.usersHeading }}
                >
                    users
                </MuiTypography>

                <LoginStatus />
            </MuiToolbar>
        </MuiAppBar>
    );
};

export default Navbar;
