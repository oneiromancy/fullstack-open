import anecdoteServices from '../services/anecdote';

const initialState = [];

export const initialiseAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteServices.getAll();

        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        });
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = { content, votes: 0 };
        const savedAnecdote = await anecdoteServices.createOne(newAnecdote);

        dispatch({
            type: 'NEW_ANECDOTE',
            data: savedAnecdote,
        });
    };
};

export const upvoteAnecdote = (anecdote) => {
    return async (dispatch) => {
        const upvotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        const savedAnecdote = await anecdoteServices.updateOne(upvotedAnecdote);

        dispatch({
            type: 'UPVOTE_ANECDOTE',
            data: savedAnecdote,
        });
    };
};

const anecdotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data;
        case 'NEW_ANECDOTE':
            return [...state, action.data];
        case 'UPVOTE_ANECDOTE':
            return state.map((anecdote) =>
                anecdote.id === action.data.id ? action.data : anecdote,
            );
        default:
            return state;
    }
};

export default anecdotesReducer;
