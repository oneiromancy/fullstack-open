import React from 'react';
import AnecdoteForm from './AnecdoteForm';
import AnecdoteList from './AnecdoteList';
import Notification from './Notification';
import Filter from './Filter';

function App() {
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
