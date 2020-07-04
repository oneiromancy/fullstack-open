import React, { useState, useEffect } from 'react';
import BlogPage from './BlogPage';
import LoginPage from './LoginPage';
import blogService from '../services/blogs';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedinUser = window.localStorage.getItem('user');

        if (loggedinUser) {
            const user = JSON.parse(loggedinUser);
            setUser(user);

            blogService.setToken(user.token);
        }
    }, []);

    return (
        <div className="App">
            {user ? (
                <BlogPage user={user} setUser={setUser} />
            ) : (
                <LoginPage setUser={setUser} />
            )}
        </div>
    );
}

export default App;
