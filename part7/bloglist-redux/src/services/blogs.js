import axios from 'axios';

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const formattedToken = `Bearer ${token}`;

    return formattedToken;
};

const getAll = async () => {
    const res = await axios.get('http://localhost:3001/api/blogs');

    return res.data;
};

const getOne = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/blogs/${id}`);

    return res.data;
};

const createOne = async (blog) => {
    const config = {
        headers: { Authorization: getToken() },
    };
    const res = await axios.post(
        'http://localhost:3001/api/blogs',
        blog,
        config,
    );

    return res.data;
};

const updateOne = async (blog) => {
    const config = {
        headers: { Authorization: getToken() },
    };
    const res = await axios.put(
        `http://localhost:3001/api/blogs/${blog.id}`,
        blog,
        config,
    );

    return res.data;
};

const deleteOne = async (id) => {
    const config = {
        headers: { Authorization: getToken() },
    };

    const res = await axios.delete(
        `http://localhost:3001/api/blogs/${id}`,
        config,
    );

    return res.data;
};

const createComment = async (blog) => {
    const config = {
        headers: { Authorization: getToken() },
    };
    const res = await axios.post(
        `http://localhost:3001/api/blogs/${blog.id}/comments`,
        blog,
        config,
    );

    return res.data;
};

export default {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    createComment,
};
