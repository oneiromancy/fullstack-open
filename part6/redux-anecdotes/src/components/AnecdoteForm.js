import React from 'react';
// import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdote';
import { setNotification } from '../reducers/notification';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {
    // Part Of Hooks Solution

    // const dispatch = useDispatch();

    const addAnecdote = async (e) => {
        e.preventDefault();

        const content = e.target.content.value;
        e.target.content.value = '';

        props.createAnecdote(content);
        props.setNotification(`You created ${content}`, 3);

        // Part Of Hooks Solution

        // dispatch(createAnecdote(content));
        // dispatch(setNotification(`You created ${content}`, 3000));
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
