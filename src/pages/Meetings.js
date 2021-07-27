import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Segment,
    Header,
    Icon,
    Loader,
    Dropdown,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import { MeetingsHeader } from '../components/Headers';
import { getAllMeetings } from '../database';
import { sortOptions } from '../config/formOptions';

import meetingStyles from '../styles/meetings.module.scss';
import MeetingGroup from '../components/meetings/MeetingGroup';

const Meetings = ({ store }) => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState('day');
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

    return (
        <>
            <MeetingsHeader />
            <Container textAlign="center">
                <Segment basic textAlign="center">
                    <h1 className={meetingStyles.header}>{meetings.length > 0 ? 'Meetings' : 'Welcome.'}</h1>
                    <Dropdown
                        disabled = {meetings.length === 0}
                        name="sort"
                        floating
                        labeled
                        basic
                        button
                        className="icon"
                        icon={
                            sortOptions.find((option) => option.value === sort)
                                .icon
                        }
                        options={sortOptions}
                        value={sort}
                        onChange={(e, { value }) => setSort(value)}
                    />
                </Segment>

                <Segment basic>
                    {loading ? (
                        <Loader active inline="centered">
                            Loading Meetings
                        </Loader>
                    ) : meetings.length > 0 ? (
                        <MeetingGroup
                            categorizeBy={sort}
                            {...{ meetings, onEdit }}
                        />
                    ) : (
                        <Header size="huge" icon>
                            <Icon name="folder open" />
                            Click <Link to="/meetings/new">here</Link> to
                            add a meeting.
                            <Header.Subheader>
                                Or click the <i>new meeting</i> button above.
                            </Header.Subheader>
                        </Header>
                    )}
                </Segment>
            </Container>
        </>
    );
};

export default Meetings;
