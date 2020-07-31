import React from 'react';
import { useSelector } from 'react-redux';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

const Notification = ({ success }) => {
    const notification = useSelector(({ notification }) => notification);

    return (
        <>
            {notification && (
                <MuiSnackbar open={Boolean(notification)}>
                    <MuiAlert
                        variant="filled"
                        severity={success ? 'success' : 'error'}
                        elevation={6}
                    >
                        {notification}
                    </MuiAlert>
                </MuiSnackbar>
            )}
        </>
    );
};

export default Notification;
