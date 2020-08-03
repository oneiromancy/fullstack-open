import React from 'react';
import axios from 'axios';
import { useStateValue, setSinglePatient, setDiagnosesList } from '../state';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { Patient as IPatient, Diagnosis as IDiagnosis } from '../types';
import { Header, Divider, Container } from 'semantic-ui-react';
import Patient from './Patient';
import Entries from './Entries';

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatientById = async () => {
            try {
                const { data: patientFromApi } = await axios.get<IPatient>(
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

    React.useEffect(() => {
        const fetchDiagnosesList = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<
                    IDiagnosis[]
                >(`${apiBaseUrl}/diagnoses`);
                dispatch(setDiagnosesList(diagnosesFromApi));
            } catch (e) {
                console.log(e);
            }
        };

        fetchDiagnosesList();
        // eslint-disable-next-line
    }, [dispatch]);

    const patient = patients[id];

    return (
        <>
            {patient && (
                <Container>
                    <Header as="h2">Health Record</Header>
                    <Divider hidden />
                    <Patient patient={patient} />
                    <Divider hidden />
                    <Entries entries={patient.entries} />
                </Container>
            )}
        </>
    );
};

export default PatientPage;
