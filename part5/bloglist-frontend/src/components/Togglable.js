import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const style = {
    button: {
        borderRadius: '0.25rem',
        border: '1px solid black',
    },
};

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? '' : 'none' };
    const hideWhenVisible = { display: visible ? 'none' : '' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    customStyle={style.button}
                    handleClick={toggleVisibility}
                    label={props.showButton}
                />
            </div>

            <div style={showWhenVisible}>
                <Button
                    customStyle={style.button}
                    handleClick={toggleVisibility}
                    label={props.hideButton}
                />
                {props.children}
            </div>
        </div>
    );
});

Togglable.propTypes = {
    showButton: PropTypes.string.isRequired,
    hideButton: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Togglable;
