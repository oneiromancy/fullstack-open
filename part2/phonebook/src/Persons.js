import React from "react";
import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            <h3>Numbers</h3>
            <ul>
                {persons.map((person) => {
                    return (
                        <li key={person.name}>
                            <Person
                                person={person}
                                deletePerson={deletePerson}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Persons;
