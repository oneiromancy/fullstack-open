import patients from '../data/patients';
import {
    IPublicPatient,
    IPatient,
    INewPatient,
    IEntry,
} from '../types/patients';
import { v4 as uuidv4 } from 'uuid';

let savedPatients: IPatient[] = [...patients];

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
    console.log();
    return savedPatients.find((patient) => patient.id === id);
};

const createOne = (patient: INewPatient): IPublicPatient => {
    const newPatient = {
        ...patient,
        id: uuidv4(),
        entries: [] as IEntry[],
    };

    savedPatients = savedPatients.concat(newPatient);

    const { ssn, entries, ...publicPatient } = newPatient;

    return publicPatient;
};

export default { getAll, getById, createOne };
