import React from 'react';

interface Part {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    part: Part;
}

const Content: React.FC<ContentProps> = ({ part }) => {
    return (
        <p>
            {part.name} {part.exerciseCount}
        </p>
    );
};

export default Content;
