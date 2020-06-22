import React from "react";
import "./Voting.css";
import Button from "./Button";

const Votes = ({ handleDownvoting, handleUpvoting, voteCount }) => {
    return (
        <div className="voting__container">
            <div>
                <Button handleClick={handleDownvoting} text="&#128078;" />
                <Button handleClick={handleUpvoting} text="&#128077;" />
                <div className="voting__vote-count">{voteCount} votes</div>
            </div>
        </div>
    );
};
export default Votes;
