import React, { useState, useEffect } from 'react';
import MeetingCardGroup from '../components/meetings/MeetingCardGroup';
import {
    Container,
    Segment,
    Header,
    Icon,
    Loader,
    Button,
    Label,
    Menu,
} from 'semantic-ui-react';
import { getAllMeetings } from '../database';
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
    let [meetings, setMeetings] = useState(null);

    const header = (
        <Menu size="large" secondary pointing>
            <Menu.Item as={Link} to="/">
                <Label color="orange" size="big" content="Linki" />
            </Menu.Item>
            <Menu.Item as={Link} to="/meetings/new" position="right">
                <Label
                    size="big"
                    basic
                    color="orange"
                    content="New Meeting"
                    icon="plus"
                />
            </Menu.Item>
        </Menu>
    );

    // const meetingExample = {
    //     name: 'Biology',
    //     link: 'https://example.com/meet',
    //     pass: 'example1234',
    //     day: 'Tuesday',
    //     color: 'green',
    //     time: Date.now(),
    // };

    useEffect(() => {
        getAllMeetings(store).then((m) => setMeetings(m));
        console.log(meetings);
    }, [store]);

    const onDelete = async (meeting) => {};

    const categorizeMeetingsByDay = (meetings) =>
        days.map((day) => {
            const meetsOnDay = meetings.filter((meet) => meet.day === day);
            if (Object.keys(meetsOnDay).length !== 0) {
                return (
                    <MeetingCardGroup
                        header={day || 'Not recurring'}
                        meetings={meetsOnDay}
                        onDelete={onDelete}
                    />
                );
            } else return null;
        });

    return (
        <>
            {header}
            <Container textAlign="center">
                <Segment basic textAlign="center">
                    <h1>Your Meetings</h1>
                </Segment>
                <Segment basic>
                    {meetings !== null && meetings.length > 0 ? (
                        categorizeMeetingsByDay(meetings)
                    ) : meetings === null ? (
                        <Loader active inline="centered">
                            Loading Meetings
                        </Loader>
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
                {/* <div styles={{ position: 'fixed', bottom: 0, right: 0 }}>
                <Button
                    as={Link}
                    to="/meetings/new"
                    circular
                    color="orange"
                    icon="plus"
                    size="huge"
                />
            </div> */}
            </Container>
        </>
    );
};

export default Meetings;
