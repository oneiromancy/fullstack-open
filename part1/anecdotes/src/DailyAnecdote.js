import React from "react";
import "./DailyAnecdote.css";
import Button from "./Button";
import Anecdote from "./Anecdote";
import Voting from "./Voting";

const DailyAnecdote = ({
    handleRandomAnecdote,
    anecdote,
    voteCount,
    handleDownvoting,
    handleUpvoting,
}) => {
    return (
        <div className="daily-anecdote">
            <div className="daily-anecdote__header">
                <div className="daily-anecdote__refresh-button">
                    <Button handleClick={handleRandomAnecdote} text="&#8635;" />
                </div>
                <h1>Anecdote of the day</h1>
            </div>

            <Anecdote text={anecdote} />
            <Voting
                voteCount={voteCount}
                handleDownvoting={handleDownvoting}
                handleUpvoting={handleUpvoting}
            />
        </div>
    );
};

export default DailyAnecdote;
