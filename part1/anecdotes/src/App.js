import React, { useState } from "react";
import "./App.css";
import DailyAnecdote from "./DailyAnecdote";
import MostPopular from "./MostPopular";

const data = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = () => {
    const [selected, setSelected] = useState(0);
    const [anecdotes, setVote] = useState(
        [...data].map((entry) => {
            return { anecdote: entry, votes: 0 };
        })
    );

    const generateRandomAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    };

    const upvote = () => {
        let newAnecdotes = [...anecdotes];
        newAnecdotes[selected].votes += 1;
        setVote(newAnecdotes);
    };

    const downvote = () => {
        let newAnecdotes = [...anecdotes];
        newAnecdotes[selected].votes -= 1;

        setVote(newAnecdotes);
    };

    return (
        <div className="app">
            <DailyAnecdote
                handleRandomAnecdote={generateRandomAnecdote}
                anecdote={anecdotes[selected].anecdote}
                voteCount={anecdotes[selected].votes}
                handleDownvoting={downvote}
                handleUpvoting={upvote}
            />
            <MostPopular anecdotes={anecdotes} />
        </div>
    );
};

export default App;
