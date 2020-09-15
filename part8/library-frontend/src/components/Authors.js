import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from '../queries';
import Select from 'react-select';

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS);
    const [selectedOption, setSelectedOption] = useState();
    const [born, setBorn] = useState();

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error.message);
        },
    });

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const submit = (event) => {
        event.preventDefault();

        updateAuthor({
            variables: { name: selectedOption.value, born: +born },
        });

        setSelectedOption('');
        setBorn('');
    };

    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {result.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Set birth year</h2>

            <Select
                value={selectedOption}
                onChange={handleChange}
                options={result.data.allAuthors.map((a) => {
                    return { label: a.name, value: a.name };
                })}
            />

            <form onSubmit={submit}>
                <div>
                    <label>Born: </label>
                    <input onChange={({ target }) => setBorn(target.value)} />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    );
};

export default Authors;
