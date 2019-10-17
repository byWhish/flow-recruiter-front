import React from 'react';
import styles from './Icons.module.css';

export const DeleteIcon = ({ onClick, opacity }) => <img alt="delete icon" className={styles.tableIcon} style={{ opacity }} src="/img/icons/delete.png" onClick={onClick} />;

export const EditIcon = ({ onClick, opacity }) => <img alt="edit icon" className={styles.tableIcon} style={{ opacity }} src="/img/icons/edit.png" onClick={onClick} />;

export const CheckIcon = ({ onClick, opacity }) => <img alt="check icon" className={styles.tableIcon} style={{ opacity }} src="/img/icons/check.png" onClick={onClick} />;

export const CloseIcon = ({ onClick, opacity }) => <img alt="close icon" className={styles.tableIcon} style={{ opacity }} src="/img/icons/close.png" onClick={onClick} />;
