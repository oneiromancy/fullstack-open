import { INewPatientEntry, Gender } from '../types/patients';

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
    return typeof text === 'string';
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDOB = (dateOfBirth: string): string => {
    if (!dateOfBirth || !isDate(dateOfBirth))
        throw new Error(`Incorrect or missing date of birth (${dateOfBirth})`);

    return dateOfBirth;
};

const parseGender = (gender: Gender): Gender => {
    if (!gender || !isGender(gender))
        throw new Error(`Incorrect or missing gender (${gender})`);

    return gender;
};

const parseName = (name: string): string => {
    if (!name || !isString(name))
        throw new Error(`Incorrect or missing name (${name})`);

    return name;
};

const parseOccupation = (occupation: string): string => {
    if (!occupation || !isString(occupation))
        throw new Error(`Incorrect or missing occupation (${occupation})`);

    return occupation;
};

const parseSSN = (ssn: string): string => {
    if (!ssn || !isString(ssn))
        throw new Error(`Incorrect or missing occupation (${ssn})`);

    return ssn;
};

export const toNewPatientEntry = (object: any): INewPatientEntry => {
    const newPatient = {
        name: parseName(object.name),
        gender: parseGender(object.gender),
        dateOfBirth: parseDOB(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
    };

    return newPatient;
};
