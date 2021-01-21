import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import {
    Form,
    Button,
    Label,
    Segment,
    Header,
    Divider,
    Input,
} from 'semantic-ui-react';

import SemanticFieldWrapper from '../components/form/SemanticFieldWrapper';
import { createMeeting } from '../database';
import { newMeetingSchema } from '../config/yupSchemas';
import { dayOptions, colorOptions } from '../config/newMeetingFormOptions';

import formStyles from '../styles/form.module.scss';
import mainStyles from '../styles/main.module.scss';

const renderError = (inputName, errors, touched) =>
    touched[inputName] && errors[inputName]
        ? {
              content: `${errors[inputName]}`,
              pointing: 'above',
          }
        : null;

const NewMeeting = ({ store }) => {
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
        } catch (err) {}
        actions.setSubmitting(false);
    };

    return (
        <div
            className={`${mainStyles.centerContent} ${mainStyles.backgroundSquare}`}
        >
            <div className={formStyles.mediumFormWidth}>
                <Segment>
                    <Formik
                        initialValues={{
                            name: '',
                            link: '',
                            day: '',
                            time: '',
                            pass: '',
                            color: '',
                            zoomPinOnly: false,
                        }}
                        enableReinitialize={true}
                        validationSchema={newMeetingSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            errors,
                            touched,
                        }) => (
                            <Form
                                error={Object.keys(errors).length !== 0}
                                loading={isSubmitting}
                                onSubmit={handleSubmit}
                            >
                                <Header
                                    color={values.color ? values.color : null}
                                    content="Add a new meeting"
                                    as="h1"
                                />
                                <SemanticFieldWrapper
                                    label="I only have a Zoom pin."
                                    component={Form.Checkbox}
                                    name="zoomPinOnly"
                                />

                                <Divider hidden />

                                <Form.Input
                                    name="name"
                                    label="Name"
                                    type="text"
                                    placeholder="Ex: Friday Night Meet"
                                    onChange={handleChange}
                                    error={renderError('name', errors, touched)}
                                />
                                <Form.Field
                                    error={touched.link && !!errors.link}
                                >
                                    <label>Link</label>
                                    <Input
                                        name="link"
                                        onChange={handleChange}
                                        label={
                                            values.zoomPinOnly ? (
                                                'https://zoom.us/j/'
                                            ) : (
                                                <Label icon="chain" />
                                            )
                                        }
                                        placeholder={
                                            values.zoomPinOnly
                                                ? '0000000000'
                                                : 'https://example.com/join/meet'
                                        }
                                    />
                                    {touched.link && errors.link ? (
                                        <Label basic color="red" pointing>
                                            {errors.link}
                                        </Label>
                                    ) : null}
                                </Form.Field>

                                <Divider hidden />

                                <Divider horizontal>Optional</Divider>

                                <Form.Group widths="equal">
                                    <SemanticFieldWrapper
                                        label="Day (Recurring)"
                                        name="day"
                                        options={dayOptions}
                                        component={Form.Dropdown}
                                        placeholder="Pick one"
                                        selection
                                        onChange={handleChange}
                                        fluid
                                    />
                                    <Form.Input
                                        label="Time"
                                        name="time"
                                        placeholder="10:30 AM"
                                        onChange={handleChange}
                                        fluid
                                        error={renderError(
                                            'time',
                                            errors,
                                            touched
                                        )}
                                    />
                                </Form.Group>

                                <Form.Input
                                    name="pass"
                                    label="Passcode "
                                    onChange={handleChange}
                                />

                                <SemanticFieldWrapper
                                    label="Color"
                                    name="color"
                                    placeholder="Pick one"
                                    selection
                                    options={colorOptions}
                                    component={Form.Dropdown}
                                    onChange={handleChange}
                                />

                                <Divider hidden />

                                <Button
                                    color={
                                        values.color ? values.color : 'orange'
                                    }
                                    type="submit"
                                    size="big"
                                    icon="plus"
                                    content="Add"
                                />
                                <Button
                                    onClick={routeChange}
                                    basic
                                    size="big"
                                    icon="cancel"
                                />
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </div>
        </div>
    );
};

export default NewMeeting;
