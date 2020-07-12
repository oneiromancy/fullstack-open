import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { upvoteAnecdote } from '../reducers/anecdote';
import { setNotification } from '../reducers/notification';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
    // Part of Hooks Solution

    // const sortByVotes = (anecdotes) => {
    //     return anecdotes.sort((a, b) => b.votes - a.votes);
    // };

    // const filterByQuery = (anecdotes, query) => {
    //     return anecdotes.filter((anecdote) => {
    //         return anecdote.content.toLowerCase().includes(query.toLowerCase());
    //     });
    // };

    // const anecdotes = useSelector(({ anecdotes, filter }) => {
    //     if (filter.type === 'SHOW_ALL') {
    //         return sortByVotes(anecdotes);
    //     }

    //     return sortByVotes(filterByQuery(anecdotes, filter.query));
    // });

    // const dispatch = useDispatch();

    const handleAnecdoteUpvote = async (id) => {
        const anecdoteToUpdate = props.anecdotes.find(
            (anecdote) => anecdote.id === id,
        );

        // Part of Hooks Solution

        // dispatch(upvoteAnecdote(anecdoteToUpdate));
        // dispatch(
        //     setNotification(`You upvoted ${anecdoteToUpdate.content}`, 3000),
        // );

        props.upvoteAnecdote(anecdoteToUpdate);
        props.setNotification(`You upvoted ${anecdoteToUpdate.content}`, 3);
    };

    return (
        <div>
            {props.anecdotes.map((anecdote) => {
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

const mapStateToProps = (state) => {
    const sortByVotes = (anecdotes) => {
        return anecdotes.sort((a, b) => b.votes - a.votes);
    };

    const filterByQuery = (anecdotes, query) => {
        return anecdotes.filter((anecdote) => {
            return anecdote.content.toLowerCase().includes(query.toLowerCase());
        });
    };

    return {
        anecdotes:
            state.filter.type === 'SHOW_ALL'
                ? sortByVotes(state.anecdotes)
                : sortByVotes(
                      filterByQuery(state.anecdotes, state.filter.query),
                  ),
    };
};

const mapDispatchToProps = {
    upvoteAnecdote,
    setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
