import React from 'react';
import { Patient as IPatient } from '../types';
import {
    Card,
    Icon,
    Container,
    Header,
    SemanticICONS,
} from 'semantic-ui-react';

interface Props {
    patient: IPatient;
}

const Patient: React.FC<Props> = ({ patient }) => {
    const genderIcons = {
        female: 'venus',
        male: 'mars',
        other: 'genderless',
    };

    return (
        <Container>
            <Header as="h3">Patient</Header>

            <Card>
                <Card.Content>
                    <Card.Header>
                        {patient.name}{' '}
                        <Icon
                            name={genderIcons[patient.gender] as SemanticICONS}
                            size="large"
                        />
                    </Card.Header>
                    <Card.Meta>DOB: {patient.dateOfBirth}</Card.Meta>
                    <Card.Description>
                        Occupation: {patient.occupation}
                    </Card.Description>
                    <Card.Description>SSN: {patient.ssn}</Card.Description>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default Patient;
