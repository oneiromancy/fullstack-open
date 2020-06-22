import React from "react";

const Total = ({ parts }) => {
    return (
        <p>
            Number of exercises{" "}
            {parts.reduce((accum, curr) => {
                return accum + curr.exercises;
            }, 0)}
        </p>
    );
};

export default Total;
