import React from 'react';
import { Formik } from 'formik';

import {
    Form,
    Button,
    Label,
    Segment,
    Header,
    Divider,
    Input,
    Message,
} from 'semantic-ui-react';

import SemanticFieldWrapper from './SemanticFieldWrapper';

import { newMeetingSchema } from '../../config/yupSchemas';
import { dayOptions, colorOptions } from '../../config/formOptions';

import formStyles from '../../styles/form.module.scss';

const MeetingForm = ({
    onSubmit,
    onCancel,
    initialMeetingValues,
    title,
    submitButtonName,
    submitButtonIcon,
    dbError,
}) => {
    const renderError = (inputName, errors, touched) =>
        touched[inputName] && errors[inputName]
            ? {
                  content: `${errors[inputName]}`,
                  pointing: 'above',
              }
            : null;

    return (
        <div className={formStyles.mediumFormWidth}>
            <Segment>
                <Formik
                    initialValues={initialMeetingValues}
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
                            error={
                                Object.keys(errors).length !== 0 || !!dbError
                            }
                            loading={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <Header
                                color={values.color ? values.color : null}
                                content={title}
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
                                value={values.name}
                            />
                            <Form.Field error={touched.link && !!errors.link}>
                                <label>Link</label>
                                <Input
                                    name="link"
                                    onChange={handleChange}
                                    value={values.link}
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
                                    value={values.day}
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
                                    value={values.time}
                                    placeholder="10:30 AM"
                                    onChange={handleChange}
                                    fluid
                                    error={renderError('time', errors, touched)}
                                />
                            </Form.Group>

                            <Form.Input
                                name="pass"
                                label="Passcode "
                                value={values.pass}
                                onChange={handleChange}
                            />

                            <SemanticFieldWrapper
                                label="Color"
                                name="color"
                                value={values.color}
                                placeholder="Pick one"
                                selection
                                options={colorOptions}
                                component={Form.Dropdown}
                                onChange={handleChange}
                            />

                            <Divider hidden />

                            <Button
                                color={values.color ? values.color : 'orange'}
                                type="submit"
                                size="big"
                                icon={submitButtonIcon}
                                content={submitButtonName}
                            />
                            <Button
                                onClick={onCancel}
                                basic
                                size="big"
                                icon="cancel"
                            />

                            {dbError ? (
                                <Message
                                    error
                                    header="Try again"
                                    content={dbError}
                                />
                            ) : null}
                        </Form>
                    )}
                </Formik>
            </Segment>
        </div>
    );
};

export default MeetingForm;
