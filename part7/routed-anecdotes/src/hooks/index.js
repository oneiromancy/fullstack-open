import { useState } from 'react';

const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = (e) => {
        setValue('');
    };

    return {
        input: {
            type,
            value,
            onChange,
        },
        reset,
    };
};

export { useField };
