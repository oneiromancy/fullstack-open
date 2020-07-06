import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const style = {
    container: {
        margin: '1rem 0',
    },
    button: {
        marginLeft: '0.4rem',
    },
};

const LoginStatus = ({ userName, handleUserState }) => {
    const clearUserPersistence = (e) => {
        e.preventDefault();

        window.localStorage.removeItem('user');
        handleUserState(null);
    };

    return (
        <div style={style.container}>
            <span>&#128064; {userName} is logged in</span>
            <Button
                label="logout"
                customStyle={style.button}
                handleClick={clearUserPersistence}
            />
        </div>
    );
};

LoginStatus.propTypes = {
    userName: PropTypes.string.isRequired,
    handleUserState: PropTypes.func.isRequired,
};

export default LoginStatus;
