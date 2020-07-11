import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvoteAnecdote } from '../reducers/anecdote';
import { setNotification } from '../reducers/notification';

const AnecdoteList = () => {
    const sortByVotes = (anecdotes) => {
        return anecdotes.sort((a, b) => b.votes - a.votes);
    };

    const filterByQuery = (anecdotes, query) => {
        return anecdotes.filter((anecdote) => {
            return anecdote.content.toLowerCase().includes(query.toLowerCase());
        });
    };

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter.type === 'SHOW_ALL') {
            return sortByVotes(anecdotes);
        }

        return sortByVotes(filterByQuery(anecdotes, filter.query));
    });

    const dispatch = useDispatch();

    const handleAnecdoteUpvote = (id) => {
        const anecdoteToUpdate = anecdotes.find(
            (anecdote) => anecdote.id === id,
        );

        dispatch(upvoteAnecdote(anecdoteToUpdate));
        dispatch(
            setNotification(`You upvoted ${anecdoteToUpdate.content}`, 3000),
        );
    };

    return (
        <div>
            {anecdotes.map((anecdote) => {
                return (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={handleAnecdoteUpvote}
                    />
                );
            })}
        </div>
    );
};

export default AnecdoteList;
