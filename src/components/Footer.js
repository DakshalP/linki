import React from 'react';
import styles from '../styles/footer.module.scss';

const Footer = () => (
    <div className={styles.background}>
        <p className={styles.text}>View on <a href="https://github.com/DakshalP/linki">Github</a>. Uses Google Analytics.</p>
    </div>
);

export default Footer;
