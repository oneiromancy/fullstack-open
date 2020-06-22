import React from "react";
import Header from "./Header";
import Button from "./Button";

const Feedback = ({ handleClick }) => {
    return (
        <div>
            <Header />
            <Button text="Good" handleClick={handleClick} />
            <Button text="Neutral" handleClick={handleClick} />
            <Button text="Bad" handleClick={handleClick} />
        </div>
    );
};

export default Feedback;
