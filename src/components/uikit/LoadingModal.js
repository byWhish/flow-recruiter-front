import React from 'react';
import Loading from './Loading';
import styles from './LoadingModal.module.css';
import { DONE, ERROR, LOADING } from '../../context/config';

const LoadingModal = ({ state }) => {
    switch (state) {
        case LOADING:
            return (
                <div className={styles.loadingModal}>
                    <Loading />
                </div>
            );
        case DONE:
            return null;
        case ERROR:
            return (
                <div className={styles.loadingModal}>
                    <img alt="error" src="/img/error.jpg" />
                </div>
            );
        default:
            return null;
    }
};

export default LoadingModal;
