import React from 'react';
import {
    Paper as MuiPaper,
    List as MuiList,
    ListItem as MuiListItem,
} from '@material-ui/core';

const CommentList = ({ comments }) => {
    const styles = {
        comment: { padding: '0.25rem' },
    };

    return (
        <MuiList>
            {comments.map((comment) => {
                return (
                    <MuiListItem key={comment._id}>
                        <MuiPaper style={styles.comment}>
                            {comment.text}
                        </MuiPaper>
                    </MuiListItem>
                );
            })}
        </MuiList>
    );
};

export default CommentList;
