import React from 'react';
import MeetingCard from './MeetingCard';
import { Card, Divider, Segment } from 'semantic-ui-react';

const MeetingCardGroup = ({ header, meetings, onDelete }) => (
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
                    {...meeting}
                />
            ))}
        </Card.Group>
    </>
);

export default MeetingCardGroup;
