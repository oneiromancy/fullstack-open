import React, { useState, useEffect } from 'react';
import { useApolloClient, useSubscription, useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommended from './components/Recommended';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);
    const client = useApolloClient();
    const allBooksQuery = useQuery(ALL_BOOKS);

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map((p) => p.id).includes(object.id);

        const dataInStore = client.readQuery({ query: ALL_BOOKS });

        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: {
                    allBooks: dataInStore.allBooks.concat(addedBook),
                },
            });
        }
    };

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            updateCacheWith(addedBook);
        },
    });

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        if (token) {
            setToken(token);
        }
    }, []);

    if (!token) {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm setToken={setToken} />
            </div>
        );
    }

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommended')}>
                    recommended
                </button>
                <button onClick={() => logout()}>logout</button>
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} allBooksQuery={allBooksQuery} />

            <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

            <Recommended show={page === 'recommended'} />
        </div>
    );
};

export default App;
