import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dimmer, Divider, Loader, Segment } from 'semantic-ui-react';

import MeetingForm from '../components/form/MeetingForm';
import { getMeeting, editMeeting, deleteMeeting } from '../database';
import mainStyles from '../styles/main.module.scss';
import formStyles from '../styles/form.module.scss';

const EditMeeting = ({ store, match }) => {
    const [dbError, setDBError] = useState('');
    const [loading, setLoading] = useState(true);
    const [meeting, setMeeting] = useState(null);

    const history = useHistory();
    const routeChange = () => {
        let path = `/meetings`;
        history.push(path);
    };

    useEffect(() => {
        setLoading(true);
        const fetchMeeting = async () => {
            try {
                const meetingId = match.params.id;
                const fetchedMeeting = await getMeeting(store, meetingId);
                setMeeting(fetchedMeeting);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMeeting();
    }, [store, match]);

    const onSubmit = async (values, actions) => {
        if (values.zoomPinOnly)
            values.link = `https://zoom.us/j/${values.link}`;
        try {
            await editMeeting(store, values);
            routeChange();
        } catch (err) {
            setDBError(`${err.message}`);
            console.log(dbError);
        }
        actions.setSubmitting(false);
    };

    const onDelete = async () => {
        setLoading(true);
        try {
            await deleteMeeting(store, meeting);
            setLoading(false);
            routeChange();
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <>
                <Dimmer active inverted>
                    <Loader inverted>Loading Meeting info...</Loader>
                </Dimmer>
            </>
        );
    } else if (typeof meeting === 'undefined') {
        return <h1>Meeting not found.</h1>;
    } else {
        if(meeting.zoomPinOnly) meeting.link = meeting.link.replace(/\D/g,''); //remove link text if only zoom pin was entered
        return (
            <div className={mainStyles.backgroundSquare}>
                <div
                    className={`${mainStyles.centerContent} ${mainStyles.backgroundMaxSize}`}
                >
                    <div className={formStyles.mediumFormWidth}>
                        <Segment basic>
                            <Button
                                basic
                                content="delete meeting"
                                color="black"
                                size="big"
                                icon="trash"
                                floated="right"
                                onClick={onDelete}
                            />
                        </Segment>
                    </div>
                    <Divider hidden />
                    <MeetingForm
                        title="Edit meeting"
                        submitButtonName="Update"
                        submitButtonIcon="exchange"
                        onSubmit={onSubmit}
                        onCancel={routeChange}
                        dbError={dbError}
                        initialMeetingValues={meeting}
                    />
                </div>
            </div>
        );
    }
};

export default EditMeeting;
