import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import styles from './SideBar.module.css';

const Sidebar = ({ auth }) => {
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const handleOpenClick = useCallback(() => {
        setShow(true);
    }, []);
    const handleCloseClick = useCallback(() => {
        setShow(false);
    }, []);
    const handleGetProfile = useCallback((err, profile) => {
        setUserName(profile.given_name);
        setUserAvatar(profile.picture);
    }, []);
    useEffect(() => {
        if (auth.accessToken) auth.getProfile(handleGetProfile);
    }, [auth, auth.accessToken, handleGetProfile]);

    return (
        <div className={styles.sideBar}>
            <div className={styles.menuButton} onClick={handleOpenClick} role="button" tabIndex={0}>
                <img src="/img/menu.png" />
            </div>
            <div className={clsx([styles.menu], { [styles.show]: show })} onClick={handleCloseClick} onMouseLeave={handleCloseClick} role="button" tabIndex={0}>
                <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                        <img src={auth.userAvatar} alt="" />
                    </div>
                    <div className={styles.userName}>
                        {auth.userName}
                    </div>
                </div>
                <Link to="/home">
                    <div className={styles.menuItem}>
                        <span>Inicio</span>
                    </div>
                </Link>
                <Link to="/projects/create">
                    <div className={styles.menuItem}>
                        <span>Nuevo proyecto</span>
                    </div>
                </Link>
                <Link to="/projects/all">
                    <div className={styles.menuItem}>
                        <span>Proyectos</span>
                    </div>
                </Link>
                <Link to="/candidates/all">
                    <div className={styles.menuItem}>
                        <span>Candidatos</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default observer(Sidebar);
