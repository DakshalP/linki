import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Segment,
    Container,
    Button,
    Label,
    Icon,
    Divider,
} from 'semantic-ui-react';
import styles from '../styles/main.module.scss';
import Footer from '../components/Footer';
import { doesDBExist } from '../database';

const Home = () => {
    let history = useHistory();

    //useCallback to memoize for useEffect and prevent unnecessary re-render
    const routeChange = useCallback(() => {
        let path = `/auth`;
        history.push(path);
    }, [history]);

    useEffect(() => {
        const testDB = async () => {
            if (await doesDBExist()) routeChange();
        };
        testDB();
    }, [routeChange]);

    return (
        <>
            <div className={styles.background}>
                <Segment textAlign="center" basic padded="very">
                    <h1 className={styles.mainHeader}>
                        <Icon.Group>
                            <Icon color="BLACK" name="circle outline" />
                            <Icon size="mini" color="orange" name="chain" />
                        </Icon.Group>
                        Linki
                    </h1>
                    <h2>A simple way to store your online meeting links.</h2>
                    <Label color="grey" content="encrypted" icon="check" />
                    <Label color="grey" content="locally stored" icon="check" />
                    <Label color="grey" content="categorization" icon="check" />
                </Segment>
                <Divider hidden />
                <Container textAlign="center">
                    <Button
                        onClick={routeChange}
                        content="Get started"
                        icon="right arrow"
                        labelPosition="left"
                        size="huge"
                        color="orange"
                    />
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Home;
