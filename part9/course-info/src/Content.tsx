import React from 'react';
import Part from './Part';
import { CoursePart } from './types';

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
    return (
        <div>
            {parts.map((part, i) => {
                return <Part key={i} part={part} />;
            })}
        </div>
    );
};

export default Content;
