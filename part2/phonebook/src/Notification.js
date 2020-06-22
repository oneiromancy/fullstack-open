import React from "react";
import "./Notification.css";

const Notification = ({ message, type }) => {
    return (
        <>
            {message && (
                <div className={`notification notification__${type}`}>
                    {message}
                </div>
            )}
        </>
    );
};

export default Notification;
