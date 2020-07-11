import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const res = await axios.get(BASE_URL);

    return res.data;
};

const createOne = async (anecdote) => {
    const res = await axios.post(BASE_URL, anecdote);

    return res.data;
};

const updateOne = async (anecdote) => {
    const res = await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote);

    return res.data;
};

export default { getAll, createOne, updateOne };
