import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const style = {
    textField: {
        margin: '0.5rem 0',
    },
    likeButton: {
        margin: '0 0.5rem',
    },
    deleteButton: {
        marginTop: '0.5rem',
    },
};

const BlogDetails = ({ blog, handleBlogUpdate, handleBlogDeletion }) => {
    const handleLikesClick = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 };

        handleBlogUpdate(updatedBlog);
    };

    const handleDeleteClick = () => {
        handleBlogDeletion(blog);
    };

    return (
        <div>
            <div style={style.textField}>Title: {blog.title}</div>
            <div style={style.textField}>Url: {blog.url}</div>
            <div style={style.textField}>
                <span>Likes: {blog.likes}</span>
                <Button
                    label="like"
                    customStyle={style.likeButton}
                    handleClick={handleLikesClick}
                />
            </div>
            <div style={style.textField}>Author: {blog.author}</div>
            <Button
                label="remove"
                customStyle={style.deleteButton}
                handleClick={handleDeleteClick}
            />
        </div>
    );
};

BlogDetails.protoTypes = {
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

export default BlogDetails;
