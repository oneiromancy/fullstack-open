import React, { useState, useEffect } from "react";
import "./App.css";
import personsServices from "./services/persons";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import SearchForm from "./SearchForm";
import Notification from "./Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [notification, setNotification] = useState({
        message: "",
        type: "",
    });

    useEffect(() => {
        console.log("fetching data...");

        personsServices.getAll().then((persons) => {
            setPersons(persons);
        });
    }, []);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState({ term: "", active: false });

    const addPerson = (e) => {
        e.preventDefault();

        const newPerson = {
            name: newName,
            number: newNumber,
        };

        if (personExists(newPerson.name)) {
            const foundPerson = personExists(newPerson.name);

            const confirmUpdate = window.confirm(
                `Would you like to update the phone number of ${foundPerson.name}?`
            );

            if (confirmUpdate) {
                personsServices
                    .updateOne(foundPerson.id, newPerson)
                    .then((person) => {
                        console.log(person);
                        displayNotification(
                            `The phone number of ${person.name} has been successfully updated`,
                            "successful"
                        );
                        setPersons(
                            persons.map((entry) => {
                                return entry.id !== person.id ? entry : person;
                            })
                        );
                    })
                    .catch((err) => {
                        displayNotification(
                            `${foundPerson.name} has been deleted from the phone book`,
                            "unsuccessful"
                        );

                        setPersons(
                            persons.filter((entry) => {
                                return entry.id !== foundPerson.id;
                            })
                        );
                    });
            }
        } else {
            personsServices
                .createOne({ ...newPerson, id: persons.length + 1 })
                .then((person) => {
                    displayNotification(
                        `${person.name} has been successfully added to the phone book`,
                        "successful"
                    );

                    setPersons(persons.concat(person));
                });
        }

        setNewName("");
        setNewNumber("");
    };

    const deletePerson = (person) => {
        const confirmDeletion = window.confirm(
            `Would you like to proceed with the deletion of ${person.name}?`
        );

        if (confirmDeletion) {
            personsServices
                .deleteOne(person.id)
                .then(() => {
                    displayNotification(
                        `${person.name} has been successfully deleted from the phone book`,
                        "successful"
                    );
                    setPersons(
                        persons.filter((entry) => {
                            return entry.id !== person.id;
                        })
                    );
                })
                .catch((err) => {
                    displayNotification(
                        `${person.name} has already been removed from the server`,
                        "unsuccessful"
                    );

                    setPersons(
                        persons.filter((entry) => {
                            return entry.id !== person.id;
                        })
                    );
                });
        }
    };

    const displayNotification = (message, type) => {
        setNotification({
            message,
            type,
        });

        setTimeout(() => setNotification({ message: "", type: "" }), 2000);
    };

    const personExists = (name) => {
        return persons.find(
            (person) => person.name.toLowerCase() === name.toLowerCase()
        );
    };

    const trackSearchInput = (e) => {
        const newSearch = {
            term: e.target.value.toLowerCase(),
            active: e.target.value ? true : false,
        };

        setSearch(newSearch);
    };

    const trackNewNameInput = (e) => {
        setNewName(e.target.value);
    };

    const trackNewNumberInput = (e) => {
        setNewNumber(e.target.value);
    };

    const filterByName = () => {
        return persons.filter((person) => {
            return person.name.toLowerCase().includes(search.term);
        });
    };

    const personsToShow = search.active ? filterByName() : persons;

    return (
        <div className="App">
            <Notification {...notification} />

            <h2>Phonebook</h2>

            <SearchForm handleSearchInput={trackSearchInput} />

            <PersonForm
                newName={newName}
                newNumber={newNumber}
                addPerson={addPerson}
                handleNewNameInput={trackNewNameInput}
                handleNewNumberInput={trackNewNumberInput}
            />

            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    );
};

export default App;
