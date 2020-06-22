import React from "react";
import "./MostPopular.css";

const MostPopular = ({ anecdotes }) => {
    const sortedAnecdotes = [...anecdotes]
        .sort((a, b) => (a.votes > b.votes ? 1 : b.votes > a.votes ? -1 : 0))
        .reverse();

    return (
        <div className="most-popular">
            <h2 className="most-popular__header">Most Popular</h2>
            <ol>
                {sortedAnecdotes.map((entry) => {
                    return (
                        <li
                            className="most-popular__anecdote"
                            key={entry.anecdote}
                        >
                            {entry.anecdote.substring(0, 60)}... ({entry.votes}{" "}
                            votes)
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default MostPopular;
