import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
    return <>{message && <div>{message}</div>}</>;
};

Notification.propTypes = {
    message: PropTypes.string,
};

export default Notification;
