import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ restricted, children, ...rest }) => {
    const authenticatedUser = useSelector(
        ({ authenticatedUser }) => authenticatedUser,
    );

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return authenticatedUser && restricted ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        />
    );
};

export default PublicRoute;
