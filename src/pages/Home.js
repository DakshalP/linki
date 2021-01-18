import React from 'react';
import styles from '../styles/main.module.scss';
import { Segment, Container, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';

const Home = () => {
    const history = useHistory();

    const routeChange = () => {
        let path = `/auth/initial`;
        history.push(path);
    };

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
