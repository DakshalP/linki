import React from 'react';
import MeetingCard from './MeetingCard';
import { Card, Divider, Segment } from 'semantic-ui-react';
import styles from '../../styles/meetings.module.scss';

const MeetingCardGroup = ({
    header,
    meetings,
    onEdit,
    editMode,
    isSecondary = false,
}) => (
    <Segment basic secondary={isSecondary}>
        <Divider hidden />
        {header ? (
            <Divider horizontal>
                <span className={styles.groupHeader}>{header}</span>
            </Divider>
        ) : null}
        <Card.Group centered={!isSecondary}>
            {meetings.map((meeting) => (
                <MeetingCard
                    key={meeting._id}
                    onEdit={onEdit}
                    editMode={editMode}
                    {...meeting}
                />
            ))}
        </Card.Group>
    </Segment>
);

export default MeetingCardGroup;
