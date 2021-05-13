import React from 'react';
import { useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { doesDBExist } from '../database';
import InitialLock from '../components/InitialLock';
import Unlock from '../components/Unlock';
import Header from '../components/Headers';
import ErrorCard from '../components/ErrorCard'
import mainStyles from '../styles/main.module.scss';

const Auth = ({ setStore }) => {
    const loader = (
        <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    );

    let [form, setForm] = useState(loader);

    useEffect(() => {
        //based on if there is already a db in existance, show a certain form
        async function getForm() {
            try {
                const formComponent = (await doesDBExist()) ? (
                    <Unlock setStore={setStore} />
                ) : (
                    <InitialLock setStore={setStore} />
                );
                setForm(formComponent);
            } catch (err) {
                if(err.name === "IndexDBException") setForm(<ErrorCard databaseError />);
                else console.error("Error connecting to database: \n" + err);
            }
        }
        getForm();
    }, [setStore]);

    return (
        <div className={mainStyles.backgroundSlant}>
            <Header />
            <div className={mainStyles.centerContent}>{form}</div>
        </div>
    );
};

export default Auth;
