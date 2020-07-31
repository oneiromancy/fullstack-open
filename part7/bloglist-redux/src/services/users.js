import axios from 'axios';

const getOne = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/users/${id}`);

    return res.data;
};

const getAll = async () => {
    const res = await axios.get('http://localhost:3001/api/users');

    return res.data;
};

export default { getAll, getOne };
