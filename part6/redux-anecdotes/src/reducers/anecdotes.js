const initialState = [];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createAnecdote = (content) => {
    const action = {
        type: 'NEW_ANECDOTE',
        data: {
            id: generateId(),
            content,
            votes: 0,
        },
    };

    return action;
};

export const upvoteAnecdoteById = (id) => {
    const action = {
        type: 'UPVOTE_ANECDOTE',
        data: {
            id,
        },
    };

    return action;
};

const anecdotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return [...state, action.data];
        case 'UPVOTE_ANECDOTE':
            return state.map((anecdote) =>
                anecdote.id === action.data.id
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote,
            );
        default:
            return state;
    }
};

export default anecdotesReducer;
