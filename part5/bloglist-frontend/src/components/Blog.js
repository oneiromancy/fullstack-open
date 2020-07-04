import React from 'react';

const Blog = ({ title, author }) => {
    return (
        <div>
            {title} by {author}
        </div>
    );
};

export default Blog;
