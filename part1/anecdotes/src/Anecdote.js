import React from "react";
import "./Anecdote.css";

const Anecdote = ({ text }) => {
    return <p className="anecdote__text">"{text}"</p>;
};

export default Anecdote;
