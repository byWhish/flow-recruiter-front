import React from 'react';
import { Typography } from '@material-ui/core';
import Loading from './Loading';
import styles from './LoadingModal.module.css';
import { CONFIRMED, ERROR, LOADING, UNLOAD } from '../../context/config';
import { ButtonMaterial } from './UIkit';

const LoadingModal = ({ state, setState }) => {
    switch (state) {
        case LOADING:
            return (
                <div className={styles.loadingModal}>
                    <Loading />
                </div>
            );
        case CONFIRMED:
            return (
                <div className={styles.loadingModal}>
                    <div className={styles.confirmed}>
                        <Typography>Accion realizada con exito</Typography>
                        <ButtonMaterial caption="Hecho" onClick={() => setState(UNLOAD)} />
                    </div>
                </div>
            );
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
