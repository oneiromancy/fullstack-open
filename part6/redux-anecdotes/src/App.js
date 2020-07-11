import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initialiseAnecdotes } from './reducers/anecdote';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialiseAnecdotes());
    }, [dispatch]);

    return (
        <div className="App">
            <Notification />

            <h2>Anecdote List</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
}

export default App;
