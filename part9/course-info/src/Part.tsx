import React from 'react';
import { CoursePart } from './types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
                <div>
                    <h3>Section: {part.name}</h3>
                    <p>Description: {part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
        case 'Using props to pass data':
            return (
                <div>
                    <h3>Section: {part.name}</h3>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Group Projects: {part.groupProjectCount}</p>
                </div>
            );
        case 'Deeper type usage':
            return (
                <div>
                    <h3>Section: {part.name}</h3>
                    <p>Description: {part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>
                        Submission Link:{' '}
                        <a href={part.exerciseSubmissionLink}>
                            {part.exerciseSubmissionLink}
                        </a>
                    </p>
                </div>
            );
        case 'Conclusion':
            return (
                <div>
                    <h3>Section: {part.name}</h3>
                    <p>Description: {part.description}</p>
                    <p>Exercises: {part.exerciseCount}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;
