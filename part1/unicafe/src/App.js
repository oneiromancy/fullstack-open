import React, { useState } from "react";
import "./App.css";
import Feedback from "./Feedback";
import Statistics from "./Statistics";

const App = () => {
    const [good, setGood] = useState({ votes: 0, value: 1 });
    const [neutral, setNeutral] = useState({ votes: 0, value: 0 });
    const [bad, setBad] = useState({ votes: 0, value: -1 });

    const handleClick = (e) => {
        switch (e.target.name) {
            case "good":
                const newGood = {
                    ...good,
                    votes: good.votes + 1,
                };

                setGood(newGood);
                break;

            case "neutral":
                const newNeutral = {
                    ...neutral,
                    votes: neutral.votes + 1,
                };

                setNeutral(newNeutral);
                break;

            case "bad":
                const newBad = {
                    ...bad,
                    votes: bad.votes + 1,
                };

                setBad(newBad);
                break;
        }
    };

    return (
        <div className="app">
            <Feedback handleClick={handleClick} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
