import React from 'react';
import AuthForm from './AuthForm';

const FirstLock = () => {
    const formContent = {
        submitFunction: {},
        formHeader: 'Create a Passkey',
        formIcon: 'key',
        formDescription:
            'You will provide this key to access your links in the future. \n Make sure that it is secure.',
        buttonContent: 'Create Link Vault',
        buttonIcon: 'lock',
    };

    return <AuthForm {...formContent} />;
};

export default FirstLock;
