import React, { useState, useEffect } from 'react';
import BlogPage from './BlogPage';
import LoginPage from './LoginPage';
import blogService from '../services/blogs';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function persistUser() {
            const loggedinUser = window.localStorage.getItem('user');

            if (loggedinUser) {
                const user = JSON.parse(loggedinUser);
                setUser(user);

                blogService.setToken(user.token);
            }
        }

        persistUser();
    }, []);

    return (
        <div className="App">
            {!user ? (
                <LoginPage handleUserState={setUser} />
            ) : (
                <BlogPage user={user} handleUserState={setUser} />
            )}
        </div>
    );
}

export default App;
