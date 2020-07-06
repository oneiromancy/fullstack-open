import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({ blogs, handleBlogUpdate, handleBlogDeletion }) => {
    return (
        <div>
            {blogs.map((blog) => {
                return (
                    <div key={blog.id}>
                        <Blog
                            blog={blog}
                            handleBlogUpdate={handleBlogUpdate}
                            handleBlogDeletion={handleBlogDeletion}
                        />
                    </div>
                );
            })}
        </div>
    );
};

BlogList.protoTypes = {
    blogs: PropTypes.arrayOf(
        PropTypes.shape({
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
    ).isRequired,
    handleBlogUpdate: PropTypes.func.isRequired,
    handleBlogDeletion: PropTypes.func.isRequired,
};

export default BlogList;
