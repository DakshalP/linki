import React from 'react';
import MeetingCard from './MeetingCard';
import { Card, Divider } from 'semantic-ui-react';

const MeetingCardGroup = ({ header, meetings, onEdit, editMode }) => (
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
                    onEdit={onEdit}
                    editMode={editMode}
                    {...meeting}
                />
            ))}
        </Card.Group>
    </>
);

export default MeetingCardGroup;
