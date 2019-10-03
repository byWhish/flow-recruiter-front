import React, { useCallback, useEffect, useState } from 'react';
import styles from './Candidates.module.css';
import CandidateService from '../Services/CandidateService';
import { PaginatedTable } from '../components/table/Tables';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial } from '../components/uikit/UIkit';

const columns = [
    {
        id: 'id',
        label: 'id',
        minWidth: 120,
        align: 'left',
    },
    {
        id: 'email',
        label: 'email',
        minWidth: 120,
        align: 'left',
    },
];

const Candidates = ({ recruitmentId }) => {
    const [candidates, setCandidates] = useState([]);

    const fetchCandidates = useCallback(() => {
        CandidateService.fetchCandidates()
            .then((result) => {
                setCandidates(result);
            });
    }, []);

    useEffect(() => {
        fetchCandidates();
    }, [fetchCandidates]);

    const handleSendClick = () => {
        FormInvitationService.inviteCandidates(candidates, recruitmentId).then(() => alert('Ok'));
    };

    return (
        <div className={styles.candidates}>
            <PaginatedTable items={candidates} columns={columns} />
            <ButtonMaterial onClick={handleSendClick} caption="Enviar email" />
        </div>
    );
};

export default Candidates;
