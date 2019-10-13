import React from 'react';
import styles from './Loading.module.css';

const Loading = () => (
    <div className={styles.loading}>
        <div className={styles.ldsring}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);

export default Loading;
