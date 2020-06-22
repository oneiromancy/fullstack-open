import React from "react";
import "./Person.css";
import Button from "./Button";

const Person = ({ person, deletePerson }) => {
    return (
        <div className="person__container">
            <span className="person__info">
                {person.name} {person.number}
            </span>
            <Button text="Delete" handleClick={() => deletePerson(person)} />
        </div>
    );
};

export default Person;
