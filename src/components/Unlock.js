import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './form/AuthForm';
import { createStore } from '../database';

const Unlock = ({ setStore }) => {
    const history = useHistory();
    const [dbError, setDbError] = useState('');

    const onSubmit = async ({ passkey }, actions) => {
        try {
            const store = await createStore(passkey);
            setStore(store);
            history.push('/meetings');
        } catch (err) {
            if (err.message === 'Wrong passphrase')
                setDbError('Incorrect passkey');
            else setDbError(`${err}`);
        }
        actions.setSubmitting(false);
    };

    const formContent = {
        submitFunction: onSubmit,
        formHeader: 'Enter passkey to unlock your link vault.',
        formIcon: 'lock',
        formDescription: '',
        buttonContent: 'Unlock',
        buttonIcon: 'unlock',
        dbError,
    };

    return <AuthForm {...formContent} />;
};

export default Unlock;
