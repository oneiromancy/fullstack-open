export interface Entry {}

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
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type IPublicPatient = Omit<IPatient, 'ssn' | 'entries'>;

export type INewPatient = Omit<IPatient, 'id' | 'entries'>;
