import React, { useCallback, useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './NavLink.module.css';

const NavLink = ({ tab, active, onActive, index, enabled }) => {
    const selected = useMemo(() => index === active, [active, index]);

    const handleActive = useCallback(
        (e) => {
            e.stopPropagation();
            onActive(index);
        },
        [index, onActive],
    );

    return (
        <Link className={clsx(styles.link, { [styles.disabled]: !enabled })} to={tab.to} onClick={handleActive}>
            <div className={styles.tab}>
                <span className={clsx(styles.label, { [styles.selected]: selected })}>{tab.label}</span>
            </div>
            <div className={styles.activeNavWrapper}>
                <div className={clsx(styles.activeNav, { [styles.selected]: selected })} />
            </div>
        </Link>
    );
};

NavLink.propTypes = {
    tab: PropTypes.object.isRequired,
    active: PropTypes.number.isRequired,
    onActive: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    enabled: PropTypes.bool.isRequired,
};

export default NavLink;
