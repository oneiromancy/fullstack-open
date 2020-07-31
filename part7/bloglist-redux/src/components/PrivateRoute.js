import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const authenticatedUser = useSelector(
        ({ authenticatedUser }) => authenticatedUser,
    );

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return authenticatedUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default PrivateRoute;
