import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BlogOverview from './BlogOverview';
import BlogDetails from './BlogDetails';
import Button from './Button';

const style = {
    blogContainer: {
        width: '40rem',
        marginTop: '0.5rem',
        boxSizing: 'border-box',
        padding: '2rem',
        border: '0.1rem solid black',
    },
    overviewContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
};

const Blog = ({ blog, handleBlogUpdate, handleBlogDeletion }) => {
    const [fullViewMode, setFullViewMode] = useState(false);

    const toggleFullView = () => {
        setFullViewMode(!fullViewMode);
    };

    return (
        <div style={style.blogContainer} className="blog-post">
            {!fullViewMode ? (
                <div style={style.overviewContainer}>
                    <BlogOverview title={blog.title} author={blog.author} />
                    <Button
                        label="view"
                        className="view-blog-button"
                        handleClick={toggleFullView}
                    />
                </div>
            ) : (
                <div style={style.detailsContainer}>
                    <BlogDetails
                        blog={blog}
                        handleBlogUpdate={handleBlogUpdate}
                        handleBlogDeletion={handleBlogDeletion}
                    />
                    <Button label="hide" handleClick={toggleFullView} />
                </div>
            )}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
    }),
    handleBlogUpdate: PropTypes.func.isRequired,
    handleBlogDeletion: PropTypes.func.isRequired,
};

export default Blog;
