import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';
import { createStore } from '../database';

const InitialLock = ({ setStore }) => {
    const history = useHistory();
    const [dbError, setDbError] = useState('');

    const onSubmit = async ({ passkey }, actions) => {
        try {
            const store = await createStore(passkey);
            setStore(store);
            history.push('/meetings');
        } catch (err) {
            setDbError(`${err}`);
        }
        actions.setSubmitting(false);
    };

    const formContent = {
        submitFunction: onSubmit,
        formHeader: 'Create a Passkey',
        formIcon: 'key',
        formDescription:
            'You will provide this key to access your links in the future. \n Make sure that it is secure.',
        buttonContent: 'Create Link Vault',
        buttonIcon: 'lock',
        dbError,
    };

    return <AuthForm {...formContent} />;
};

export default InitialLock;
