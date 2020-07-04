import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map((blog) => {
                return <Blog key={blog.id} {...blog} />;
            })}
        </div>
    );
};

export default BlogList;
