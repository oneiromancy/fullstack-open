import React from 'react';
import { CoursePart } from './types';

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
    return (
        <p>
            Total number of exercises:{' '}
            {parts.reduce((count, part) => count + part.exerciseCount, 0)}
        </p>
    );
};

export default Total;
