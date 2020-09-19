import React, { useEffect, useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useLazyQuery } from '@apollo/client';

const Books = (props) => {
    const [genreFilter, setGenreFilter] = useState(null);
    const [getAllBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, {
        variables: { genre: genreFilter },
    });

    useEffect(() => {
        getAllBooks();
    }, []);

    if (!props.show) {
        return null;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const updateFilter = (event) => {
        if (event.target.innerText === 'all genres') {
            setGenreFilter(null);
        } else {
            setGenreFilter(event.target.innerText);
        }
    };

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {data &&
                        data.allBooks.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div>
                <button onClick={(e) => updateFilter(e)}>refactoring</button>
                <button onClick={(e) => updateFilter(e)}>agile</button>
                <button onClick={(e) => updateFilter(e)}>patterns</button>
                <button onClick={(e) => updateFilter(e)}>design</button>
                <button onClick={(e) => updateFilter(e)}>crime</button>
                <button onClick={(e) => updateFilter(e)}>classic</button>
                <button onClick={(e) => updateFilter(e)}>all genres</button>
            </div>
        </div>
    );
};

export default Books;
