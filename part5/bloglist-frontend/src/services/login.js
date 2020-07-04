import axios from 'axios';

const loginUser = async ({ username, password }) => {
    const res = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
    });

    return res.data;
};

export default { loginUser };
