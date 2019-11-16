import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const handleOpenClick = useCallback(() => {
        setShow(true);
    }, []);
    const handleCloseClick = useCallback(() => {
        setShow(false);
    }, []);
    return (
        <div className={styles.sideBar}>
            <div className={styles.menuButton} onClick={handleOpenClick} role="button" tabIndex={0}>
                <img src="/img/menu.png" />
            </div>
            <div className={clsx([styles.menu], { [styles.show]: show })} onClick={handleCloseClick} onMouseLeave={handleCloseClick} role="button" tabIndex={0}>
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

export default Sidebar;
