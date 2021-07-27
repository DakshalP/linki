import React from 'react';
import MeetingCard from './MeetingCard';
import { Divider, Segment } from 'semantic-ui-react';
import styles from '../../styles/meetings.module.scss';
import { isElement } from 'react-dom/cjs/react-dom-test-utils.production.min';

//convert to comparable numbers [HH, MM]
const convertTime = (time) => {
    const period = time.match(/(AM|PM)/g)[0];
    time = time.replace(/(AM|PM)/g, ''); //remove period

    let timeArr = time.split(':').map((t) => parseInt(t));
    if (period === 'PM') timeArr[0] += 12;

    return timeArr;
};

const compareTimes = (timeA, timeB) => {
    //empty cases
    if (timeA === '' && timeB === '') return 0;
    else if (timeA === '') return -1;
    else if (timeB === '') return 1;

    //compare times
    const a = convertTime(timeA),
        b = convertTime(timeB);

    const hourDifference = Math.abs(a[0] - b[0]);
    const secondDifference = Math.abs(a[1] - b[1]);

    if (hourDifference > 0) return hourDifference;
    else if (secondDifference > 0) return secondDifference / 60;
    else return 0;
};

const MeetingCardGroup = ({
    header,
    meetings,
    onEdit,
    isSecondary = false,
}) => (
    <Segment basic secondary={isSecondary}>
        <Divider hidden />
        {header ? (
            <Divider horizontal>
                <span className={styles.groupHeader}>{header}</span>
            </Divider>
        ) : null}
        <div className={isSecondary ? styles.cardGrid : styles.cardFlex}>
            {meetings
                .sort((a, b) => compareTimes(a.time, b.time))
                .map((meeting) => (
                    <MeetingCard
                        key={meeting._id}
                        onEdit={onEdit}
                        isSecondary={isSecondary}
                        {...meeting}
                    />
                ))}
        </div>
    </Segment>
);

export default MeetingCardGroup;
