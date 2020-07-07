import { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const res = await axios.get(baseUrl);

                if (res && res.data) {
                    setResources([...res.data]);
                }
            } catch (e) {
                console.log(e);
            }
        }

        getAll();
    }, []);

    const create = async (resource) => {
        try {
            const res = await axios.post(baseUrl, resource);

            if (res && res.data) {
                setResources(resources.concat(res.data));
            }
        } catch (e) {
            console.log(e);
        }
    };

    const service = {
        create,
    };

    return [resources, service];
};

export { useField, useResource };
