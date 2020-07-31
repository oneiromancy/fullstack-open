import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../reducers/users';
import {
    Table as MuiTable,
    TableBody as MuiTableBody,
    TableHead as MuiTableHead,
    TableCell as MuiTableCell,
    TableRow as MuiTableRow,
    TableContainer as MuiTableContainer,
} from '@material-ui/core';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(({ users }) => users);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <MuiTableContainer>
            <MuiTable>
                <MuiTableHead>
                    <MuiTableRow>
                        <MuiTableCell></MuiTableCell>
                        <MuiTableCell>blogs created</MuiTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {users.map((user) => {
                        return (
                            <MuiTableRow key={user.id}>
                                <MuiTableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </MuiTableCell>
                                <MuiTableCell>{user.blogs.length}</MuiTableCell>
                            </MuiTableRow>
                        );
                    })}
                </MuiTableBody>
            </MuiTable>
        </MuiTableContainer>
    );
};

export default UserList;
