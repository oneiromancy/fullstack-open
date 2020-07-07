import React from 'react';
import { Link } from 'react-router-dom';

const AnecdoteList = ({ notification, anecdotes }) => (
    <div>
        {notification && <div>{notification}</div>}
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
                    <li>{anecdote.content}</li>
                </Link>
            ))}
        </ul>
    </div>
);

export default AnecdoteList;
