import React from 'react';
import { useState, useEffect } from 'react';
import InitialLock from '../components/InitialLock';
import Unlock from '../components/Unlock';
import mainStyles from '../styles/main.module.scss';

const Auth = ({ authMode }) => {
    let [key, setKey] = useState('');

    useEffect(() => {
        console.log(key);
    }, [key]);

    let form;
    switch (authMode) {
        case 'unlock':
            form = <Unlock setKey={setKey} />;
            break;
        case 'initial_lock':
            form = <InitialLock setKey={setKey} />;
            break;
        default:
            form = <h1>Wrong Page</h1>;
    }
    return (
        <div className={mainStyles.backgroundSlant}>
            <div className={mainStyles.centerContent}>{form}</div>
        </div>
    );
};

export default Auth;
