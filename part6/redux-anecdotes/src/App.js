import React from 'react';
import AnecdoteForm from './AnecdoteForm';
import AnecdoteList from './AnecdoteList';

function App() {
    return (
        <div className="App">
            <h2>Anecdote List</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
}

export default App;
