import React from 'react';
import MeetingCard from './MeetingCard';
import { Card, Divider } from 'semantic-ui-react';

const MeetingCardGroup = ({ header, meetings, onDelete, editMode }) => (
    <>
        <Divider hidden />
        {header ? (
            <Divider horizontal>
                <h3>{header}</h3>
            </Divider>
        ) : null}
        <Card.Group>
            {meetings.map((meeting) => (
                <MeetingCard
                    key={meeting._id}
                    onDelete={onDelete}
                    editMode={editMode}
                    {...meeting}
                />
            ))}
        </Card.Group>
    </>
);

export default MeetingCardGroup;
