import React from 'react';
import { useStateValue } from '../state';
import { List } from 'semantic-ui-react';
import { Diagnosis as IDiagnosis } from '../types';
import { isObjectPopulated } from '../utils';

interface Props {
    diagnosesCodes: Array<IDiagnosis['code']> | undefined;
}

const DiagnosesList: React.FC<Props> = ({ diagnosesCodes }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <>
            {isObjectPopulated(diagnoses) && (
                <List.List as="ul">
                    {diagnosesCodes?.map((code) => {
                        return (
                            <List.Item key={code} as="li">
                                {code} {diagnoses[code].name}
                            </List.Item>
                        );
                    })}
                </List.List>
            )}
        </>
    );
};

export default DiagnosesList;
