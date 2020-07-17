import React from 'react';
import PropTypes from 'prop-types';

const defaultStyle = {
    cursor: 'pointer',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '0.25rem',
};

const Button = ({ label, id, className, customStyle, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            id={id}
            className={className}
            style={Object.assign({}, { ...defaultStyle }, { ...customStyle })}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    customStyle: PropTypes.object,
    handleClick: PropTypes.func,
};

export default Button;
