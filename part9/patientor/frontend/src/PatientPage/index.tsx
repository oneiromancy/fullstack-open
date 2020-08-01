import React from 'react';
import axios from 'axios';
import { useStateValue, setSinglePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { Card, Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatientById = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`,
                );
                dispatch(setSinglePatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };

        fetchPatientById();
        // eslint-disable-next-line
    }, [dispatch]);

    const genderOptions = {
        female: 'venus' as 'venus',
        male: 'mars' as 'mars',
        other: 'genderless' as 'genderless',
    };

    let patient: Patient = patients[id];

    return (
        <>
            {patient && (
                <Card>
                    <Card.Content>
                        <Card.Header>
                            {patient.name}{' '}
                            <Icon name={genderOptions[patient.gender]} />
                        </Card.Header>
                        <Card.Meta>DOB: {patient.dateOfBirth}</Card.Meta>
                        <Card.Description>
                            Occupation: {patient.occupation}
                        </Card.Description>
                        <Card.Description>SSN: {patient.ssn}</Card.Description>
                    </Card.Content>
                </Card>
            )}
        </>
    );
};

export default PatientPage;
