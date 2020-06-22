import React from "react";
import "./Statistics.css";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
    const unweightedTotal = parseFloat(good.votes + neutral.votes + bad.votes);
    const weightedTotal = parseFloat(
        good.votes * good.value +
            neutral.votes * neutral.value +
            bad.votes * bad.value
    );

    const averageGood = ((good.votes / unweightedTotal) * 100).toFixed(2);

    const weightedAverage = parseFloat(weightedTotal / unweightedTotal).toFixed(
        2
    );

    return (
        <div className="statistics">
            <h2>Statistics</h2>

            {unweightedTotal === 0 ? (
                <div>No feedback given</div>
            ) : (
                <table>
                    <Statistic text="Good" value={good.votes} />
                    <Statistic text="Neutral" value={neutral.votes} />
                    <Statistic text="Bad" value={bad.votes} />
                    <Statistic text="Total responses" value={unweightedTotal} />
                    <Statistic
                        text="Weighted average"
                        value={weightedAverage}
                    />
                    <Statistic text="Positve responses" value={averageGood} />
                </table>
            )}
        </div>
    );
};

export default Statistics;
