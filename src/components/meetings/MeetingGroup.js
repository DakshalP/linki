import React from 'react';

import { Label } from 'semantic-ui-react';
import MeetingCardGroup from '../meetings/MeetingCardGroup';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const colors = [
    'red',
    'green',
    'blue',
    'violet',
    'brown',
    'grey',
    'purple',
    'pink',
];

const MeetingGroup = ({ categorizeBy, onEdit, editMode, meetings }) => {
    const renderGroup = (meetings, identifier) => {
        if (Object.keys(meetings).length !== 0) {
            return (
                <MeetingCardGroup
                    key={identifier}
                    header={identifier}
                    meetings={meetings}
                    onEdit={onEdit}
                    editMode={editMode}
                    isSecondary={true}
                />
            );
        } else return null;
    };

    const todayGroup = () => {
        const today = days[new Date().getDay()];
        const meetsToday = meetings.filter((meet) => meet.day === today);
        if (Object.keys(meetsToday).length !== 0)
            return (
                <>
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
                </>
            );
        else return null;
    };

    const dailyGroup = () => {
        const todayNum = new Date().getDay();
        const meetingGroups = [];

        for (var j = 1; j < days.length; j++) {
            //loop through days, starting from the day after today
            const day = days[(todayNum + j) % days.length];

            const meetsOnDay = meetings.filter((meet) => meet.day === day);
            meetingGroups.push(renderGroup(meetsOnDay, day));
        }

        //uncategorized days
        const otherDays = meetings.filter((meet) => meet.day === '');
        meetingGroups.push(renderGroup(otherDays, 'other'));

        return meetingGroups;
    };

    const colorGroup = () => {
        const meetingGroups = colors.map((color) => {
            const meetsWithColor = meetings.filter(
                (meet) => meet.color === color
            );
            return renderGroup(meetsWithColor, color);
        });
        //no color
        const otherColor = meetings.filter((meet) => meet.color === '');
        meetingGroups.push(renderGroup(otherColor, 'default'));

        return meetingGroups;
    };

    switch (categorizeBy) {
        case 'day':
            return (
                <>
                    {todayGroup()}
                    {dailyGroup()}
                </>
            );
        case 'color':
            return colorGroup();
        default:
            return (
                <MeetingCardGroup
                    meetings={meetings}
                    editMode={editMode}
                    onEdit={onEdit}
                />
            );
    }
};

export default MeetingGroup;
