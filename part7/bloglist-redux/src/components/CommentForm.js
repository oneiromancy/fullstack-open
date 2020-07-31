import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../reducers/blogs';
import {
    TextareaAutosize as MuiTextareaAutosize,
    Button as MuiButton,
    Box as MuiBox,
} from '@material-ui/core';

const CommentForm = ({ blog }) => {
    const styles = {
        textarea: {
            width: '30rem',
            marginBottom: '0.5rem',
        },
    };

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const trackInput = (e) => {
        e.preventDefault();

        setComment(e.target.value);
    };

    const handleCommentCreation = (e) => {
        e.preventDefault();

        dispatch(createComment({ ...blog, comment }));
        setComment('');
    };

    return (
        <form onSubmit={handleCommentCreation}>
            <MuiTextareaAutosize
                style={styles.textarea}
                onChange={trackInput}
                value={comment}
                rowsMin={10}
            />

            <MuiBox>
                <MuiButton variant="outlined" type="submit">
                    comment
                </MuiButton>
            </MuiBox>
        </form>
    );
};

export default CommentForm;
