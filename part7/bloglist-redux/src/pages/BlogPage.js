import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../reducers/blogs';
import Blog from '../components/Blog';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Notification from '../components/Notification';
import { Container as MuiContainer, Box as MuiBox } from '@material-ui/core';

const BlogPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const blog = useSelector(({ blogs }) =>
        blogs.find((blog) => blog.id === id),
    );

    useEffect(() => {
        if (blog) {
            return;
        }

        dispatch(getBlogById(id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {blog && (
                <MuiContainer className="blog-post">
                    <MuiBox mt={5}>
                        <Notification success={true} />

                        <Blog blog={blog} />

                        <MuiBox mt={5}>
                            <h3>Comments</h3>

                            <CommentForm blog={blog} />

                            <MuiBox mt={4}>
                                <CommentList comments={blog.comments} />
                            </MuiBox>
                        </MuiBox>
                    </MuiBox>
                </MuiContainer>
            )}
        </>
    );
};

export default BlogPage;
