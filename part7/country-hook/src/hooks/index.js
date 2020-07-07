import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://restcountries.eu';

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

const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        async function fetchCountry() {
            if (name) {
                try {
                    const res = await axios.get(
                        `${BASE_URL}/rest/v2/name/${name}?fullText=true`,
                    );

                    if (res) {
                        setCountry({
                            data: res.data[0],
                            found: true,
                        });
                    }
                } catch (e) {
                    setCountry({
                        data: null,
                        found: false,
                    });
                }
            }

            return country;
        }

        fetchCountry();
    }, [name]);

    return country;
};

export { useField, useCountry };
