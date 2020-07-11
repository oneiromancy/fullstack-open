import React from 'react';

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <span>
                {anecdote.content} has {anecdote.votes}
            </span>
            <button onClick={() => handleClick(anecdote.id)}>vote</button>
        </div>
    );
};

export default Anecdote;
