import patients from '../data/patients.json';
import {
    IPublicPatient,
    IPatient,
    INewPatient,
    Entry,
    Gender,
} from '../types/patients';
import { v4 as uuidv4 } from 'uuid';

let savedPatients: IPatient[] = [...patients].map((patient) => {
    return {
        ...patient,
        gender: patient.gender as Gender,
        entries: patient.entries as Entry[],
    };
});

const getAll = (): IPublicPatient[] => {
    return savedPatients.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        }),
    );
};

const getById = (id: string): IPatient | undefined => {
    return savedPatients.find((patient) => patient.id === id);
};

const createOne = (patient: INewPatient): IPublicPatient => {
    const newPatient = {
        ...patient,
        id: uuidv4(),
        entries: [] as Entry[],
    };

    savedPatients = savedPatients.concat(newPatient);

    const { ssn, entries, ...publicPatient } = newPatient;

    return publicPatient;
};

export default { getAll, getById, createOne };
