import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserById } from '../reducers/users';
import {
    List as MuiList,
    ListItem as MuiListItem,
    Typography as MuiTypography,
    Container as MuiContainer,
    Box as MuiBox,
} from '@material-ui/core';

const UserPage = () => {
    const styles = {
        blog: {
            fontStyle: 'italic',
            fontSize: '1.1rem',
        },
    };

    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(({ users }) =>
        users.find((user) => id === user.id),
    );

    useEffect(() => {
        if (user) {
            return;
        }

        dispatch(getUserById(id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {user && (
                <MuiContainer>
                    <MuiBox mt={5}>
                        <MuiTypography variant="h3">
                            {user.username}
                        </MuiTypography>
                        <MuiBox mt={2}>
                            <MuiList>
                                {user.blogs.map((blog) => {
                                    return (
                                        <MuiListItem key={blog.id}>
                                            <MuiTypography style={styles.blog}>
                                                {blog.title}
                                            </MuiTypography>
                                        </MuiListItem>
                                    );
                                })}
                            </MuiList>
                        </MuiBox>
                    </MuiBox>
                </MuiContainer>
            )}
        </>
    );
};

export default UserPage;
