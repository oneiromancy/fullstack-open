import React from 'react';
import PropTypes from 'prop-types';

const BlogOverview = ({ title, author }) => {
    return (
        <div>
            {title} by {author}
        </div>
    );
};

BlogOverview.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export default BlogOverview;
