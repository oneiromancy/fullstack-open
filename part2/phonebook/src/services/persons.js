import axios from "axios";

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}/persons`;

const getAll = () => {
    const request = axios.get(BASE_URL);

    return request.then((res) => {
        return res.data;
    });
};

const createOne = (personObj) => {
    const request = axios.post(BASE_URL, personObj);

    return request.then((res) => {
        return res.data;
    });
};

const updateOne = (id, personObj) => {
    const request = axios.put(`${BASE_URL}/${id}`, personObj);

    return request.then((res) => {
        return res.data;
    });
};

const deleteOne = (id) => {
    const request = axios.delete(`${BASE_URL}/${id}`);

    return request.then((res) => {
        return res.data;
    });
};

export default { getAll, createOne, updateOne, deleteOne };
