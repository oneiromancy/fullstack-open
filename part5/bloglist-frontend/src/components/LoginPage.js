import React, { useState } from 'react';
import LoginForm from './LoginForm';

const LoginPage = ({ setUser }) => {
    const [notificationMessage, setNotificationMessage] = useState(null);

    return (
        <div>
            {notificationMessage && <div>{notificationMessage}</div>}

            <h1>Login to application</h1>
            <LoginForm
                handleNotificationMessage={setNotificationMessage}
                setUser={setUser}
            />
        </div>
    );
};

export default LoginPage;
