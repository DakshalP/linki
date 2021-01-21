import React, { useState, useEffect } from 'react';
import MeetingCardGroup from '../components/meetings/MeetingCardGroup';
import { Container, Segment, Header, Icon, Loader } from 'semantic-ui-react';

import { MeetingsHeader } from '../components/Headers';
import { getAllMeetings, deleteMeeting } from '../database';
import { Link } from 'react-router-dom';

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    '',
];

const Meetings = ({ store }) => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await loadMeetings();
        };
        fetchData();
    }, [store]);

    const loadMeetings = async () => {
        try {
            setLoading(true);
            const meets = await getAllMeetings(store);
            setMeetings(meets);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = async (meetingId) => {
        setLoading(true);
        try {
            await deleteMeeting(store, { _id: meetingId });
            await loadMeetings();
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const categorizeMeetingsByDay = (meetings) =>
        days.map((day) => {
            const meetsOnDay = meetings.filter((meet) => meet.day === day);
            if (Object.keys(meetsOnDay).length !== 0) {
                return (
                    <MeetingCardGroup
                        key={day}
                        header={day || 'Not recurring'}
                        meetings={meetsOnDay}
                        onDelete={onDelete}
                        editMode={editMode}
                    />
                );
            } else return null;
        });

    return (
        <>
            <MeetingsHeader {...{ editMode, setEditMode }} />
            <Container textAlign="center">
                <Segment basic textAlign="center">
                    <h1>Your Meetings</h1>
                </Segment>
                <Segment basic>
                    {loading ? (
                        <Loader active inline="centered">
                            Loading Meetings
                        </Loader>
                    ) : meetings.length > 0 ? (
                        categorizeMeetingsByDay(meetings)
                    ) : (
                        <Header size="huge" icon>
                            <Icon name="folder open" />
                            No Meetings Found
                            <Header.Subheader>
                                Click <Link to="/meetings/new">here</Link> to
                                create one now.
                            </Header.Subheader>
                        </Header>
                    )}
                </Segment>
            </Container>
        </>
    );
};

export default Meetings;
