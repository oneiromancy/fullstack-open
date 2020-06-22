import React from "react";
import "./Statistic.css";

const Statistic = ({ text, value }) => {
    return (
        <tr className="tr">
            <td>{text}</td>
            <td className="td__values">{value}</td>
        </tr>
    );
};

export default Statistic;
