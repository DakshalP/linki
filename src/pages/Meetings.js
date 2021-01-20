import React, { useState, useEffect } from 'react';
import MeetingCard from '../components/meetings/MeetingCard';
import { Container, Segment, Card, Loader, Button } from 'semantic-ui-react';
import { getAllMeetings } from '../database';
import { Link } from 'react-router-dom';

const Meetings = ({ store }) => {
    let [meetings, setMeetings] = useState(null);

    const meetingExample = {
        name: 'Biology',
        link: 'https://example.com/meet',
        pass: 'example1234',
        day: 'Tuesday',
        color: 'green',
        time: Date.now(),
    };

    useEffect(() => {
        getAllMeetings(store).then((m) => setMeetings(m));
    }, [store]);

    const onDelete = async (meeting) => {};

    return (
        <Container textAlign="center">
            <Segment basic textAlign="center">
                <h1>Your Meetings</h1>
            </Segment>
            <Segment basic>
                <Card.Group>
                    {meetings ? (
                        meetings.map((meeting) => (
                            <MeetingCard
                                key={meeting._id}
                                onDelete={onDelete}
                                {...meeting}
                            />
                        ))
                    ) : (
                        <Loader active inline="centered">
                            Loading Meetings
                        </Loader>
                    )}
                </Card.Group>
            </Segment>
            <div styles={{ position: 'fixed', bottom: 0, right: 0 }}>
                <Button
                    as={Link}
                    to="/meetings/new"
                    circular
                    color="orange"
                    icon="plus"
                    size="huge"
                />
            </div>
        </Container>
    );
};

export default Meetings;
