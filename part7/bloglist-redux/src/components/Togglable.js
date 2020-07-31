import React, { useState, useImperativeHandle } from 'react';
import { Button as MuiButton, Box as MuiBox } from '@material-ui/core';

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const styles = {
        showWhenVisible: {
            display: visible ? '' : 'none',
            margin: '1rem 0',
        },
        hideWhenVisible: {
            display: visible ? 'none' : '',
            margin: '1rem 0',
        },
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    return (
        <MuiBox>
            <MuiBox style={styles.hideWhenVisible}>
                <MuiButton variant="outlined" onClick={toggleVisibility}>
                    {props.showButton}
                </MuiButton>
            </MuiBox>

            <MuiBox style={styles.showWhenVisible}>
                <MuiButton variant="outlined" onClick={toggleVisibility}>
                    {props.hideButton}
                </MuiButton>
                {props.children}
            </MuiBox>
        </MuiBox>
    );
});

export default Togglable;
