import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogs';
import {
    Button as MuiButton,
    TextField as MuiTextField,
    Typography as MuiTypography,
    Box as MuiBox,
} from '@material-ui/core';

const BlogForm = ({ handleFormVisibility }) => {
    const styles = {
        heading: { fontSize: '1.5rem', margin: '1rem 0' },
    };
    const dispatch = useDispatch();
    const [newBlog, setNewBlog] = useState({ title: '', url: '', author: '' });

    const trackInput = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };

    const handleBlogCreation = async (e) => {
        e.preventDefault();

        handleFormVisibility();

        dispatch(
            createBlog({
                title: newBlog.title,
                author: newBlog.author,
                url: newBlog.url,
            }),
        );
        setNewBlog({ title: '', author: '', url: '' });
    };

    return (
        <div>
            <MuiTypography variant="h3" style={styles.heading}>
                Create new
            </MuiTypography>

            <form onSubmit={handleBlogCreation}>
                <MuiBox>
                    <MuiBox>
                        <MuiTextField
                            variant="outlined"
                            margin="dense"
                            value={newBlog.title}
                            label="Title"
                            name="title"
                            id="title"
                            onChange={trackInput}
                            required
                        />
                    </MuiBox>
                    <MuiBox>
                        <MuiTextField
                            variant="outlined"
                            margin="dense"
                            value={newBlog.author}
                            label="Author"
                            name="author"
                            id="author"
                            onChange={trackInput}
                            required
                        />
                    </MuiBox>
                    <MuiBox>
                        <MuiTextField
                            variant="outlined"
                            margin="dense"
                            value={newBlog.url}
                            label="Url"
                            name="url"
                            id="url"
                            onChange={trackInput}
                            required
                        />
                    </MuiBox>
                </MuiBox>

                <MuiButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="create-blog-button"
                    label="send"
                >
                    send
                </MuiButton>
            </form>
        </div>
    );
};

export default BlogForm;
