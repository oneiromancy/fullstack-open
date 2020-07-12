import React from 'react';
import { setVisibilityFilter } from '../reducers/filter';
// import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Filter = (props) => {
    // Part of Hooks Solution

    // const dispatch = useDispatch();

    const handleChange = (e) => {
        props.setVisibilityFilter(e.target.value);

        // Part of Hooks Solution

        // dispatch(setVisibilityFilter(e.target.value));
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

const mapDispatchToProps = {
    setVisibilityFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
