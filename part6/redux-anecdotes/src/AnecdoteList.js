import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvoteAnecdoteById } from './reducers/anecdotes';
import { setNotification, clearNotification } from './reducers/notification';

const AnecdoteList = () => {
    const sortByVotes = (anecdotes) => {
        return anecdotes.sort((a, b) => b.votes - a.votes);
    };

    const filterByQuery = (anecdotes, query) => {
        return anecdotes.filter((anecdote) => {
            return anecdote.content.includes(query);
        });
    };

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter.type === 'SHOW_ALL') {
            return sortByVotes(anecdotes);
        }

        return sortByVotes(filterByQuery(anecdotes, filter.query));
    });

    const dispatch = useDispatch();

    const upvoteAnecdote = (id) => {
        dispatch(upvoteAnecdoteById(id));

        const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
        initiateTimedNotification(`You upvoted ${anecdote.content}`);
    };

    const initiateTimedNotification = (message) => {
        dispatch(setNotification(message));

        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
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
