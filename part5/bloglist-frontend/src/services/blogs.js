import axios from 'axios';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const res = await axios.get('http://localhost:3001/api/blogs');

    return res.data;
};

const createOne = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };
    const res = await axios.post(
        'http://localhost:3001/api/blogs',
        newBlog,
        config,
    );

    return res.data;
};

export default { getAll, createOne, setToken };
