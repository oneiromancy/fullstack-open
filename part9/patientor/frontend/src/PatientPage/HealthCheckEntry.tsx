import React from 'react';
import { HealthCheckEntry as IHealthCheckEntry } from '../types';
import { List, Segment, Icon, SemanticCOLORS } from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';
import { isArrayPopulated } from '../utils';

const HealthCheckEntry: React.FC<{
    entry: IHealthCheckEntry;
}> = ({ entry }) => {
    const healthStatusColor = {
        0: 'red',
        1: 'orange',
        2: 'yellow',
        3: 'grey',
    };

    return (
        <Segment>
            <List>
                <List.Item>
                    <Icon name="user md" size="large" />
                    <List.Header>{entry.date}</List.Header>
                    <List.Description>{entry.description}</List.Description>
                </List.Item>

                {isArrayPopulated(entry.diagnosesCodes) && (
                    <List.Item>
                        <DiagnosesList diagnosesCodes={entry.diagnosesCodes} />
                    </List.Item>
                )}

                <List.Item>
                    <Icon
                        name="heart"
                        size="large"
                        color={
                            healthStatusColor[
                                entry.healthCheckRating
                            ] as SemanticCOLORS
                        }
                    />
                </List.Item>
            </List>
        </Segment>
    );
};

export default HealthCheckEntry;
