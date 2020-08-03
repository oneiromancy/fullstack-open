import { IDiagnosis } from './diagnoses';

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosesCodes?: Array<IDiagnosis['code']>;
}

enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: {
        date: string;
        criteria: string;
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export type IEntry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

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
    entries: IEntry[];
}

export type IPublicPatient = Omit<IPatient, 'ssn' | 'entries'>;

export type INewPatient = Omit<IPatient, 'id' | 'entries'>;
