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
            <div className={styles.menuButton} onClick={handleOpenClick}>
                <img src="/img/menu.png" />
            </div>
            <div className={clsx([styles.menu], { [styles.show]: show })} onClick={handleCloseClick}>
                <Link to="/">
                    <div className={styles.menuItem}>
                        <span>Home</span>
                    </div>
                </Link>
                <Link to="/projects/create">
                    <div className={styles.menuItem}>
                        <span>New project</span>
                    </div>
                </Link>
                <Link to="/projects/all">
                    <div className={styles.menuItem}>
                        <span>Projects</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
