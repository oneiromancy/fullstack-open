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

const updateOne = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };
    const res = await axios.put(
        `http://localhost:3001/api/blogs/${blog.id}`,
        blog,
        config,
    );

    return res.data;
};

const deleteOne = async (blogId) => {
    const config = {
        headers: { Authorization: token },
    };
    const res = await axios.delete(
        `http://localhost:3001/api/blogs/${blogId}`,
        config,
    );

    return res.data;
};

export default { getAll, createOne, updateOne, deleteOne, setToken };
