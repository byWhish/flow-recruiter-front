import React from 'react';
import styles from './Icons.module.css';

export const DeleteIcon = ({ onClick, opacity, pointerEvents }) => <img alt="delete icon" className={styles.tableIcon} style={{ opacity, pointerEvents }} src="/img/icons/delete.png" onClick={onClick} />;

export const EditIcon = ({ onClick, opacity, pointerEvents }) => <img alt="edit icon" className={styles.tableIcon} style={{ opacity, pointerEvents }} src="/img/icons/edit.png" onClick={onClick} />;

export const CheckIcon = ({ onClick, opacity, pointerEvents }) => <img alt="check icon" className={styles.tableIcon} style={{ opacity, pointerEvents }} src="/img/icons/check.png" onClick={onClick} />;

export const CloseIcon = ({ onClick, opacity, pointerEvents }) => <img alt="close icon" className={styles.tableIcon} style={{ opacity, pointerEvents }} src="/img/icons/close.png" onClick={onClick} />;
