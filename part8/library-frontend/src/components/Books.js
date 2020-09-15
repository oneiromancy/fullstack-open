import React from 'react';
import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Books = (props) => {
    const result = useQuery(ALL_BOOKS);

    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>Loading...</div>;
    }

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
                    {result.data.allBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
