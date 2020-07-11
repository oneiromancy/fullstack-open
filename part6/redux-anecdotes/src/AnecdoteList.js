import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvoteAnecdoteById } from './reducers/anecdotes';

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.sort((a, b) => b.votes - a.votes),
    );
    const dispatch = useDispatch();

    const upvoteAnecdote = (id) => {
        dispatch(upvoteAnecdoteById(id));
    };

    return (
        <div>
            {anecdotes.map((anecdote) => {
                return (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={upvoteAnecdote}
                    />
                );
            })}
        </div>
    );
};

export default AnecdoteList;
