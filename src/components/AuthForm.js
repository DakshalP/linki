import React from 'react';
import {
    Header,
    Button,
    Form,
    Segment,
    Icon,
    Message,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import formStyles from '../styles/form.module.scss';

const AuthForm = ({
    submitFunction,
    formHeader,
    formIcon,
    formDescription,
    buttonContent,
    buttonIcon,
    dbError,
}) => {
    return (
        <div className={formStyles.mediumFormWidth}>
            <Segment>
                <Formik
                    initialValues={{ passkey: '' }}
                    validationSchema={Yup.object({
                        passkey: Yup.string()
                            .min(6, 'Must be at least 6 characters.')
                            .required('Required')
                            .max(15, '15 characters or less'),
                    })}
                    onSubmit={submitFunction}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        errors,
                    }) => (
                        <Form
                            error={!!errors.passkey || !!dbError}
                            onSubmit={handleSubmit}
                            loading={isSubmitting}
                        >
                            <Segment textAlign="center" basic>
                                <Icon size="massive" name={formIcon}></Icon>
                                <Header as="h2">{formHeader}</Header>
                                <p>{formDescription}</p>
                            </Segment>
                            <Form.Input
                                error={
                                    touched.passkey && errors.passkey
                                        ? {
                                              content: `${errors.passkey}`,
                                              pointing: 'above',
                                          }
                                        : null
                                }
                                placeholder="Key"
                                onChange={handleChange}
                                name="passkey"
                                type="password"
                                size="huge"
                            />
                            {dbError ? (
                                <Message
                                    error
                                    header="Try again"
                                    content={dbError}
                                />
                            ) : null}
                            <Button
                                content={buttonContent}
                                icon={buttonIcon}
                                color="orange"
                                size="big"
                                type="submit"
                            />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </div>
    );
};

export default AuthForm;
