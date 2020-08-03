import React from 'react';
import { OccupationalHealthcareEntry as OccupationalHealthcare } from '../types';
import { List, Segment, Icon } from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';
import { isArrayPopulated, isObjectPopulated } from '../utils';

const OccupationalHealthcareEntry: React.FC<{
    entry: OccupationalHealthcare;
}> = ({ entry }) => {
    return (
        <Segment>
            <List>
                <List.Item>
                    <Icon name="stethoscope" size="large" />
                    <List.Header>{entry.date}</List.Header>
                    <List.Description>{entry.description}</List.Description>
                </List.Item>

                {isArrayPopulated(entry.diagnosesCodes) && (
                    <List.Item>
                        <DiagnosesList diagnosesCodes={entry.diagnosesCodes} />
                    </List.Item>
                )}

                {isObjectPopulated(entry.sickLeave) && (
                    <List.Item>
                        <b>Sick leave</b> granted from{' '}
                        {entry.sickLeave?.startDate} to{' '}
                        {entry.sickLeave?.endDate}
                    </List.Item>
                )}
            </List>
        </Segment>
    );
};

export default OccupationalHealthcareEntry;
