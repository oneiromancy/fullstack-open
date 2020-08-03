import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Entry as IEntry } from '../types';
import EntryDetails from './EntryDetails';
import { isArrayPopulated } from '../utils';

const Entries: React.FC<{ entries: IEntry[] }> = ({ entries }) => {
    return (
        <Container>
            {isArrayPopulated(entries) ? (
                <>
                    <Header as="h3">Past Entries</Header>

                    {entries.map((entry) => {
                        return <EntryDetails key={entry.id} entry={entry} />;
                    })}
                </>
            ) : (
                <Header as="h3">No health entries</Header>
            )}
        </Container>
    );
};

export default Entries;
