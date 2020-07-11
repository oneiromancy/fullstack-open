import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from './reducers/anecdotes';
import { setNotification, clearNotification } from './reducers/notification';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = (e) => {
        e.preventDefault();

        const content = e.target.content.value;
        e.target.content.value = '';

        dispatch(createAnecdote(content));
        initiateTimedNotification(`You created ${content}`);
    };

    const initiateTimedNotification = (message) => {
        dispatch(setNotification(message));

        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="content" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
