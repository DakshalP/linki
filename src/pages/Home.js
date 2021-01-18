import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Container, Button } from 'semantic-ui-react';
import Footer from '../components/Footer';
import styles from '../styles/main.module.scss';
import { doesDBExist } from '../database';

const Home = () => {
    let history = useHistory();

    const routeChange = () => {
        let path = `/auth`;
        history.push(path);
    };

    useEffect(() => {
        const testDB = async () => {
            if (await doesDBExist()) routeChange();
        };
        testDB();
    }, []);

    return (
        <>
            <div className={styles.background}>
                <Segment textAlign="center" basic padded="very">
                    <h1 className={styles.mainHeader}>Linki</h1>
                    <h2>A simple way to store your online meeting links.</h2>
                </Segment>
                <Container textAlign="center">
                    <Button
                        onClick={routeChange}
                        content="Get started"
                        icon="right arrow"
                        labelPosition="left"
                        size="huge"
                        color="orange"
                    ></Button>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Home;
