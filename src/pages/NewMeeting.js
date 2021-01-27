import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import MeetingForm from '../components/form/MeetingForm';
import { createMeeting } from '../database';
import mainStyles from '../styles/main.module.scss';

const NewMeeting = ({ store }) => {
    const [dbError, setDBError] = useState('');

    const history = useHistory();
    const routeChange = () => {
        let path = `/meetings`;
        history.push(path);
    };

    const onSubmit = async (values, actions) => {
        if (values.zoomPinOnly)
            values.link = `https://zoom.us/j/${values.link}`;
        try {
            await createMeeting(store, values);
            routeChange();
        } catch (err) {
            setDBError(`${err.message}`);
            console.log(dbError);
        }
        actions.setSubmitting(false);
    };

    return (
        <div
            className={`${mainStyles.centerContent} ${mainStyles.backgroundSquare}`}
        >
            <MeetingForm
                title="Add a new meeting"
                submitButtonName="Add"
                submitButtonIcon="plus"
                onSubmit={onSubmit}
                onCancel={routeChange}
                dbError={dbError}
            />
        </div>
    );
};

export default NewMeeting;
