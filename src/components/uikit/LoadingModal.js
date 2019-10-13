import React from 'react';
import Loading from './Loading';
import styles from './LoadingModal.module.css';

const LoadingModal = ({ show }) => (
    show && (
        <div className={styles.loadingModal}>
            <Loading />
        </div>
    )
);

export default LoadingModal;
