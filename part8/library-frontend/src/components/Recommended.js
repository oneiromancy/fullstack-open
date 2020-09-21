import React from 'react';
import { ALL_BOOKS, ME } from '../queries';
import { useQuery } from '@apollo/client';

const Recommended = (props) => {
    const bookResult = useQuery(ALL_BOOKS);
    const meResult = useQuery(ME);

    const filterFavoriteGenre = () => {
        return bookResult.data.allBooks.filter((book) => {
            return book.genres.includes(meResult.data.me.favoriteGenre);
        });
    };

    if (!props.show) {
        return null;
    }

    if (bookResult.loading || meResult.loading) {
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
                    {filterFavoriteGenre().map((a) => (
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

export default Recommended;
