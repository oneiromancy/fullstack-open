export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface IPatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type INonSensitivePatient = Omit<IPatient, 'ssn'>;

export type INewPatientEntry = Omit<IPatient, 'id'>;
