import React from 'react';
import Header from './Header';
import Total from './Total';
import Content from './Content';

const App: React.FC = () => {
    const courseName = 'Half Stack application development';
    const courseParts = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <Total parts={courseParts} />
        </div>
    );
};

export default App;
