import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const BlogForm = ({ handleBlogCreation }) => {
    const [newBlog, setNewBlog] = useState({ title: '', url: '', author: '' });

    const trackInput = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };

    const handleSumit = (e) => {
        e.preventDefault();

        handleBlogCreation(newBlog);
        setNewBlog({ title: '', author: '', url: '' });
    };

    return (
        <div>
            <h2>Create new</h2>

            <form onSubmit={handleSumit}>
                <div>
                    <input
                        name="title"
                        placeholder="Title"
                        aria-label="title"
                        onChange={trackInput}
                        value={newBlog.title}
                    />
                </div>
                <div>
                    <input
                        name="author"
                        placeholder="Author"
                        aria-label="author"
                        onChange={trackInput}
                        value={newBlog.author}
                    />
                </div>
                <div>
                    <input
                        name="url"
                        placeholder="Url"
                        aria-label="url"
                        onChange={trackInput}
                        value={newBlog.url}
                    />
                </div>

                <Button label="create" />
            </form>
        </div>
    );
};

BlogForm.protoTypes = {
    handleBlogCreation: PropTypes.func.isRequired,
};

export default BlogForm;
