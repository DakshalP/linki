import * as Yup from 'yup';

const newMeetingSchema = Yup.object({
    name: Yup.string().max(35, 'Name is too long').required('Required'),
    link: Yup.string()
        .required('Required')
        .when('zoomPinOnly', {
            is: false,
            then: Yup.string().url(
                'Invalid url. Format like https://example.com'
            ),
        })
        .when('zoomPinOnly', {
            is: true,
            then: Yup.string().matches(
                /^\d+$/,
                'Zoom pin can have digits only'
            ),
        }),
    day: Yup.string(),
    time: Yup.string().matches(
        /^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$/,
        'Format time like this HH:MM AM/PM'
    ),
    pass: Yup.string(),
    color: Yup.string(),
    zoomPinOnly: Yup.boolean(),
});

const authSchema = Yup.object({
    passkey: Yup.string()
        .min(6, 'Must be at least 6 characters.')
        .required('Required')
        .max(15, '15 characters or less'),
});

export { newMeetingSchema, authSchema };
