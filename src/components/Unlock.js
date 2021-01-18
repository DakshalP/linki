import React from 'react';
import AuthForm from './AuthForm';

const Unlock = () => {
    const formContent = {
        submitFunction: {},
        formHeader: 'Enter passkey to unlock your link vault.',
        formIcon: 'lock',
        formDescription: '',
        buttonContent: 'Unlock',
        buttonIcon: 'unlock',
    };

    return <AuthForm {...formContent} />;
};

export default Unlock;
