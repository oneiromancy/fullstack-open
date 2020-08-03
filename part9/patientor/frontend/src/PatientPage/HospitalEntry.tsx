import React from 'react';
import { HospitalEntry as Hospital } from '../types';
import { List, Segment, Icon } from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';
import { isArrayPopulated } from '../utils';

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
    return (
        <Segment>
            <List>
                <List.Item>
                    <Icon name="ambulance" size="large" />
                    <List.Header>{entry.date}</List.Header>
                    <List.Description>{entry.description}</List.Description>
                </List.Item>

                {isArrayPopulated(entry.diagnosesCodes) && (
                    <List.Item>
                        <DiagnosesList diagnosesCodes={entry.diagnosesCodes} />
                    </List.Item>
                )}

                <List.Item>
                    <List.Header>{entry.discharge.date}</List.Header>
                    <List.Description>
                        {entry.discharge.criteria}
                    </List.Description>
                </List.Item>
            </List>
        </Segment>
    );
};

export default HospitalEntry;
