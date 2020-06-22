import React from "react";
import "./Button.css";

const Button = ({ handleClick, text }) => {
    return (
        <button
            className="button"
            name={text.toLowerCase()}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default Button;
