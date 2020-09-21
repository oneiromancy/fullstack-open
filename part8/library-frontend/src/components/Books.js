import React, { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useLazyQuery } from '@apollo/client';

const Books = ({ show, allBooksQuery }) => {
    const [books, setBooks] = useState(null);
    const [getBooks, result] = useLazyQuery(ALL_BOOKS);

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks);
        }
    }, [result.data]);

    if (!show) {
        return null;
    }

    if (result.loading) {
        return <div>Loading...</div>;
    }

    const updateGenreFilter = (e) => {
        const genreFilter =
            e.target.innerText === 'all genres' ? null : e.target.innerText;

        getBooks({ variables: { genre: genreFilter } });
    };

    const renderBooks = (books) => {
        return (
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <h2>books</h2>

            {books
                ? renderBooks(books)
                : renderBooks(allBooksQuery.data.allBooks)}

            <div>
                <button onClick={(e) => updateGenreFilter(e)}>
                    refactoring
                </button>
                <button onClick={(e) => updateGenreFilter(e)}>agile</button>
                <button onClick={(e) => updateGenreFilter(e)}>patterns</button>
                <button onClick={(e) => updateGenreFilter(e)}>design</button>
                <button onClick={(e) => updateGenreFilter(e)}>crime</button>
                <button onClick={(e) => updateGenreFilter(e)}>classic</button>
                <button onClick={(e) => updateGenreFilter(e)}>
                    all genres
                </button>
            </div>
        </div>
    );
};

export default Books;
