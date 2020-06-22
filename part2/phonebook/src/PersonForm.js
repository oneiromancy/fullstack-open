import React from "react";
import Button from "./Button";

const PersonForm = ({
    newName,
    newNumber,
    addPerson,
    handleNewNameInput,
    handleNewNumberInput,
}) => {
    return (
        <div>
            <h3>Register User</h3>
            <form onSubmit={addPerson}>
                <div>
                    <label>Name: </label>
                    <input value={newName} onChange={handleNewNameInput} />
                </div>
                <div>
                    <label>Number: </label>
                    <input value={newNumber} onChange={handleNewNumberInput} />
                </div>
                <div>
                    <Button text="Add" />
                </div>
            </form>
        </div>
    );
};

export default PersonForm;
