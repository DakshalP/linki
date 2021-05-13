import React from 'react';
import { Segment, Label } from 'semantic-ui-react';

import formStyles from '../styles/form.module.scss';

const ErrorCard = ({ title, message, databaseError }) => {
    if (databaseError) {
        return (
            <div className={formStyles.mediumFormWidth}>
                <Segment>
                    <h1>Database Issue</h1>
                    <p>
                        Your device browser does not support a stable version of
                        the database that this app uses.
                    </p>
                    <p>
                        <strong>
                            Please switch to a different computer if using iOS
                            or iPadOS (this is a known issue in these operating
                            systems).
                        </strong>
                    </p>

                    <p>Try this link on a desktop computer: </p>
                    <Label
                        content="linki.netlify.app"
                        size="big"
                        color="gray"
                    />
                </Segment>
            </div>
        );
    } else
        return (
            <div className={formStyles.mediumFormWidth}>
                <Segment>
                    <h1>{title}</h1>
                    {message}
                </Segment>
            </div>
        );
};

export default ErrorCard;
