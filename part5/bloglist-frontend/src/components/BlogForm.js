import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, handleNotificationMessage }) => {
    const [newBlog, setNewBlog] = useState({ title: '', url: '', author: '' });

    const createBlog = async (e) => {
        e.preventDefault();

        try {
            const blog = await blogService.createOne(newBlog);

            setBlogs(blogs.concat(blog));

            handleNotificationMessage(
                `${newBlog.title} by ${newBlog.author} has been added to the list of blogs`,
            );

            setTimeout(() => {
                handleNotificationMessage('');
            }, 3000);
            setNewBlog({ title: '', author: '', url: '' });
        } catch (error) {
            handleNotificationMessage(
                'Blog could not be saved to the database',
            );

            setTimeout(() => {
                handleNotificationMessage('');
            }, 3000);
        }
    };

    const trackInput = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        onChange={trackInput}
                        value={newBlog.title}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        name="author"
                        onChange={trackInput}
                        value={newBlog.author}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input
                        name="url"
                        onChange={trackInput}
                        value={newBlog.url}
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default BlogForm;
