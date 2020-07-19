import patients from '../data/patients.json';
import { INonSensitivePatient, INewPatientEntry } from '../types/patients';
import { v4 as uuidv4 } from 'uuid';

const getAll = (): Array<INonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};

const createOne = (entry: INewPatientEntry): INonSensitivePatient => {
    const newPatient = {
        id: uuidv4(),
        ...entry,
    };

    patients.push(newPatient);

    const { ssn, ...reprPatient } = newPatient;

    return reprPatient;
};

export default { getAll, createOne };
