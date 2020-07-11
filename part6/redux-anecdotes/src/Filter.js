import React from 'react';
import { setVisibilityFilter } from './reducers/filter';
import { useDispatch } from 'react-redux';

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setVisibilityFilter(e.target.value));
    };

    const style = {
        marginBottom: 10,
    };

    return (
        <div style={style}>
            <span>filter</span>
            <input name="filter" onChange={handleChange} />
        </div>
    );
};

export default Filter;
