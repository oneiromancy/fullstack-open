import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks/index';

const CreateNew = (props) => {
    const content = useField('text');
    const author = useField('text');
    const info = useField('text');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addNew({
            content: content.input.value,
            author: author.input.value,
            info: info.input.value,
            votes: 0,
        });

        history.push('/');
    };

    const handleReset = (e) => {
        e.preventDefault();

        content.reset();
        author.reset();
        info.reset();
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.input} />
                </div>
                <div>
                    author
                    <input {...author.input} />
                </div>
                <div>
                    url for more info
                    <input {...info.input} />
                </div>
                <button>create</button>
                <button onClick={handleReset}>clear</button>
            </form>
        </div>
    );
};

export default CreateNew;
