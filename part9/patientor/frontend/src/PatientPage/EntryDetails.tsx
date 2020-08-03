import React from 'react';
import { Entry as IEntry } from '../types';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
};

const EntryDetails: React.FC<{ entry: IEntry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntry entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
