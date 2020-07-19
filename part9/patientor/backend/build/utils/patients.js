"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const patients_1 = require("../types/patients");
const isGender = (param) => {
    return Object.values(patients_1.Gender).includes(param);
};
const isString = (text) => {
    return typeof text === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDOB = (dateOfBirth) => {
    if (!dateOfBirth || !isDate(dateOfBirth))
        throw new Error(`Incorrect or missing date of birth (${dateOfBirth})`);
    return dateOfBirth;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender))
        throw new Error(`Incorrect or missing gender (${gender})`);
    return gender;
};
const parseName = (name) => {
    if (!name || !isString(name))
        throw new Error(`Incorrect or missing name (${name})`);
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation))
        throw new Error(`Incorrect or missing occupation (${occupation})`);
    return occupation;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn))
        throw new Error(`Incorrect or missing occupation (${ssn})`);
    return ssn;
};
exports.toNewPatientEntry = (object) => {
    const newPatient = {
        name: parseName(object.name),
        gender: parseGender(object.gender),
        dateOfBirth: parseDOB(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
    };
    return newPatient;
};
