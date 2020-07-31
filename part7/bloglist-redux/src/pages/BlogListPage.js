import React, { useRef } from 'react';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';
import Notification from '../components/Notification';
import BlogList from '../components/BlogList';
import { Container as MuiContainer } from '@material-ui/core';

const BlogListPage = () => {
    const styles = {
        container: {
            margin: '3rem 0',
        },
    };

    const noteFormRef = useRef();

    return (
        <MuiContainer style={styles.container} disableGutters>
            <Notification success={true} />

            <Togglable
                showButton="new note"
                hideButton="cancel"
                ref={noteFormRef}
            >
                <BlogForm
                    handleFormVisibility={() =>
                        noteFormRef.current.toggleVisibility()
                    }
                />
            </Togglable>

            <BlogList />
        </MuiContainer>
    );
};

export default BlogListPage;
