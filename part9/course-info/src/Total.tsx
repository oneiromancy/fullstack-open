import React from 'react';

interface Parts {
    name: string;
    exerciseCount: number;
}

interface TotalProps {
    parts: Array<Parts>;
}

const Total: React.FC<TotalProps> = ({ parts }) => {
    return (
        <p>
            Number of exercises{' '}
            {parts.reduce((counter, part) => counter + part.exerciseCount, 0)}
        </p>
    );
};

export default Total;
