import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import LoginStatus from './LoginStatus';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Notification from './Notification';

const BlogPage = ({ user, handleUserState }) => {
    const [blogs, setBlogs] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const noteFormRef = useRef();

    useEffect(() => {
        async function fetchBlogs() {
            // fetching blogs from database
            const blogs = await blogService.getAll();

            setBlogs(
                // sorting blogs by likes
                blogs.sort((a, b) => {
                    return b.likes - a.likes;
                }),
            );
        }

        fetchBlogs();
    }, []);

    const createBlog = async (newBlog) => {
        try {
            noteFormRef.current.toggleVisibility();

            const blog = await blogService.createOne(newBlog);
            setBlogs(blogs.concat(blog));

            initiateTimedNotification(
                `${newBlog.title} by ${newBlog.author} has been added to the list of blogs`,
            );
        } catch (error) {
            initiateTimedNotification(
                `${newBlog.title} by ${newBlog.author} could not be saved to the database`,
            );
        }
    };

    const deleteBlog = async (blog) => {
        const shouldDelete = window.confirm(
            `Removing ${blog.title} by ${blog.author} from database...`,
        );

        if (shouldDelete) {
            try {
                await blogService.deleteOne(blog.id);

                setBlogs(
                    blogs.filter((entry) => {
                        if (entry.id !== blog.id) {
                            return entry;
                        }
                    }),
                );

                initiateTimedNotification(
                    `${blog.title} by ${blog.author} has been successfully deleted from the list of blogs`,
                );
            } catch (error) {
                initiateTimedNotification(
                    `${blog.title} by ${blog.author} could not be delete from the database`,
                );
            }
        }
    };

    const updateBlog = async (updatedBlog) => {
        try {
            const modifiedBlog = await blogService.updateOne(updatedBlog);

            setBlogs(
                blogs
                    .map((blog) => {
                        if (blog.id === modifiedBlog.id) {
                            return modifiedBlog;
                        }

                        return blog;
                    })
                    .sort((a, b) => {
                        return b.likes - a.likes;
                    }),
            );
        } catch (error) {
            initiateTimedNotification(
                `${updatedBlog.title} by ${updatedBlog.author} could not be updated to the database`,
            );
        }
    };

    const initiateTimedNotification = (message) => {
        setNotificationMessage(message);

        setTimeout(() => {
            setNotificationMessage('');
        }, 3000);
    };

    return (
        <div>
            <Notification message={notificationMessage} />

            <div>
                <h1>Blogs</h1>
                <LoginStatus
                    userName={user.name}
                    handleUserState={handleUserState}
                />
            </div>

            <Togglable
                showButton="new note"
                hideButton="cancel"
                ref={noteFormRef}
            >
                <BlogForm handleBlogCreation={createBlog} />
            </Togglable>

            <BlogList
                blogs={blogs}
                handleBlogUpdate={updateBlog}
                handleBlogDeletion={deleteBlog}
            />
        </div>
    );
};

BlogPage.propTypes = {
    user: PropTypes.shape({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    handleUserState: PropTypes.func.isRequired,
};

export default BlogPage;
