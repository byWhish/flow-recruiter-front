import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Candidates.module.css';
import CandidateService from '../Services/CandidateService';
import PaginatedTable from '../components/table/PaginatedTable';
import FormInvitationService from '../Services/FormInvitationService';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    const fetchAnswers = useCallback(() => {
        CandidateService.fetchAnswers()
            .then((result) => {
                setCandidates(result);
            });
    }, []);

    useEffect(() => {
        fetchAnswers();
    }, [fetchAnswers]);

    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }));

    const handleSendClick = () => {
        FormInvitationService.inviteCandidates(candidates).then(() => alert('Ok'));
    };

    const classes = useStyles();

    const items = candidates.map(candidates => candidates.candidate);

    return (
        <div className={styles.candidates}>
            <PaginatedTable candidates={items} />
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSendClick}>
                Enviar email
            </Button>
        </div>
    );
};

export default Candidates;
