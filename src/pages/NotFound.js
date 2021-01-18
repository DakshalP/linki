import React from 'react';
import { Container, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from '../styles/main.module.scss';

const NotFound = () => (
    <div className={styles.backgroundSlant}>
        <Container textAlign="center">
            <Segment basic padded="very">
                <h1 className={styles.mainHeader}>404</h1>
                <h3>The page you were looking for... was not found.</h3>
                <h3>
                    <Link to="/">
                        <Icon name="left arrow" /> Home
                    </Link>
                </h3>
            </Segment>
        </Container>
    </div>
);

export default NotFound;
