import React from 'react';
import { useDispatch } from 'react-redux';
import { upvoteBlog } from '../reducers/blogs';
import {
    IconButton as MuiIconButton,
    Typography as MuiTypography,
    Box as MuiBox,
} from '@material-ui/core';

const Blog = ({ blog }) => {
    const styles = {
        heading: {
            fontStyle: 'italic',
            fontSize: '1.75rem',
        },
        link: {
            color: 'black',
            display: 'block',
            margin: '0.5rem 0.25rem 0',
        },
        upvoteButton: {
            color: 'inherit',
            fontSize: '1rem',
            margin: '0.3rem',
        },
    };

    const dispatch = useDispatch();

    const handleBlogUpvote = () => {
        dispatch(
            upvoteBlog({
                ...blog,
                likes: blog.likes + 1,
            }),
        );
    };

    return (
        <MuiBox>
            <MuiTypography variant="h3" style={styles.heading}>
                {blog.title}
            </MuiTypography>

            <MuiBox>
                <MuiTypography
                    component={'a'}
                    style={styles.link}
                    href={blog.url}
                >
                    {blog.url}
                </MuiTypography>
            </MuiBox>

            <MuiBox display="flex" alignItems="center">
                Likes: {blog.likes}
                <MuiIconButton
                    size="small"
                    style={styles.upvoteButton}
                    onClick={handleBlogUpvote}
                >
                    <span role="img" aria-label="fire emoji">
                        &#128293;
                    </span>
                </MuiIconButton>
            </MuiBox>

            <MuiBox>added by {blog.author}</MuiBox>
        </MuiBox>
    );
};

export default Blog;
