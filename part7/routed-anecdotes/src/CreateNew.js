import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateNew = (props) => {
    const [anecdote, setAnecdote] = useState({
        author: '',
        content: '',
        info: '',
        votes: 0,
    });
    const history = useHistory();

    const trackInput = (e) => {
        setAnecdote({ ...anecdote, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({ ...anecdote });
        history.push('/');
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input
                        name="content"
                        value={anecdote.content}
                        onChange={trackInput}
                    />
                </div>
                <div>
                    author
                    <input
                        name="author"
                        value={anecdote.author}
                        onChange={trackInput}
                    />
                </div>
                <div>
                    url for more info
                    <input
                        name="info"
                        value={anecdote.info}
                        onChange={trackInput}
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default CreateNew;
