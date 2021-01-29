import React, { useState, useEffect, useCallback } from 'react';
import MeetingCardGroup from '../components/meetings/MeetingCardGroup';
import {
    Container,
    Segment,
    Header,
    Icon,
    Loader,
    Label,
} from 'semantic-ui-react';

import { MeetingsHeader } from '../components/Headers';
import { getAllMeetings } from '../database';
import { Link, useHistory } from 'react-router-dom';

import meetingStyles from '../styles/meetings.module.scss';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    '',
];

const Meetings = ({ store }) => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();

    //useCallback to memoize for useEffect and prevent unnecessary re-render
    const loadMeetings = useCallback(async () => {
        try {
            setLoading(true);
            const meets = await getAllMeetings(store);
            setMeetings(meets);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, [store]);

    useEffect(() => {
        const fetchData = async () => {
            await loadMeetings();
        };
        fetchData();
    }, [store, loadMeetings]);

    const onEdit = async (meetingId) => history.push(`/meetings/${meetingId}`);

    const getMeetingsFromToday = (meetings) => {
        const today = days[new Date().getDay()];
        const meetsToday = meetings.filter((meet) => meet.day === today);
        if (Object.keys(meetsToday).length !== 0)
            return (
                <>
                    <Segment basic>
                        <div className={meetingStyles.highlight}>
                            <MeetingCardGroup
                                header={
                                    <>
                                        <h1>Today</h1>
                                        <Label pointing basic>
                                            {today}
                                        </Label>
                                    </>
                                }
                                meetings={meetsToday}
                                onEdit={onEdit}
                                editMode={editMode}
                            />
                        </div>
                    </Segment>
                </>
            );
        else return null;
    };

    const categorizeMeetingsByDay = (meetings) =>
        days.map((day) => {
            const meetsOnDay = meetings.filter((meet) => meet.day === day);
            if (Object.keys(meetsOnDay).length !== 0) {
                return (
                    <MeetingCardGroup
                        key={day}
                        header={day || 'Other'}
                        meetings={meetsOnDay}
                        onEdit={onEdit}
                        editMode={editMode}
                        isSecondary={true}
                    />
                );
            } else return null;
        });

    return (
        <>
            <MeetingsHeader {...{ editMode, setEditMode }} />
            <Container textAlign="center">
                <Segment basic textAlign="center">
                    <h1 className={meetingStyles.header}>Your Meetings</h1>
                </Segment>
                <Segment basic>
                    {loading ? (
                        <Loader active inline="centered">
                            Loading Meetings
                        </Loader>
                    ) : meetings.length > 0 ? (
                        <>
                            {getMeetingsFromToday(meetings)}
                            {categorizeMeetingsByDay(meetings)}
                        </>
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
