import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../reducers/blogs';
import {
    List as MuiList,
    ListItem as MuiListItem,
    Box as MuiBox,
} from '@material-ui/core';

const BlogList = () => {
    const styles = {
        blog: {
            color: 'black',
            textDecoration: 'underline',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            margin: '0.5rem 0',
        },
    };

    const dispatch = useDispatch();

    const blogs = useSelector(({ blogs }) =>
        blogs.sort((a, b) => {
            return b.likes - a.likes;
        }),
    );

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    return (
        <MuiBox>
            <MuiList>
                {blogs.map((blog) => {
                    return (
                        <MuiListItem
                            component={Link}
                            to={`/blogs/${blog.id}`}
                            key={blog.id}
                            style={styles.blog}
                        >
                            {blog.title} by {blog.author}
                        </MuiListItem>
                    );
                })}
            </MuiList>
        </MuiBox>
    );
};

export default BlogList;
