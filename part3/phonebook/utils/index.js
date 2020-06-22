const fs = require("fs");

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const readDB = () => JSON.parse(fs.readFileSync("db.json"));

const rewriteDB = (data) => {
    fs.writeFileSync("db.json", JSON.stringify(data));
};

const validatePerson = (database, person) => {
    const { name, number } = person;

    const personExists = database.persons.find((person) => {
        return person.name === name;
    });

    const errors = [];

    if (!name || !number) errors.push("Name and/or number is missing");

    if (personExists) errors.push("Name must be unique");

    return { isValidPerson: name && number && !personExists, errors };
};

module.exports = {
    getRandomInt,
    readDB,
    rewriteDB,
    validatePerson,
};
