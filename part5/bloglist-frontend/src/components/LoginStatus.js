import React from 'react';

const LoginStatus = ({ user, setUser }) => {
    const logoutUser = (e) => {
        e.preventDefault();

        window.localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <div>
            <div>{user.name} is logged in</div>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default LoginStatus;
