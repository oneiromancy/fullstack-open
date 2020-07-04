import React, { useState, useEffect } from 'react';
import LoginStatus from './LoginStatus';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import blogService from '../services/blogs';

const BlogPage = ({ user, setUser }) => {
    const [blogs, setBlogs] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            const blogs = await blogService.getAll();

            setBlogs(blogs);
        }

        fetchBlogs();
    }, []);

    return (
        <div>
            {notificationMessage && <div>{notificationMessage}</div>}

            <h1>Blogs</h1>
            <LoginStatus user={user} setUser={setUser} />
            <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                handleNotificationMessage={setNotificationMessage}
            />
            <BlogList blogs={blogs} />
        </div>
    );
};

export default BlogPage;
