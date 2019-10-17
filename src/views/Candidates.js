import React, { useCallback, useEffect, useState } from 'react';
import styles from './Candidates.module.css';
import CandidateService from '../Services/CandidateService';
import { PaginatedTable } from '../components/table/Tables';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial } from '../components/uikit/UIkit';
import { DONE, LOADING } from '../context/config';

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

const Candidates = ({ match, onUpdateProject, setLoading }) => {
    const [candidates, setCandidates] = useState([]);

    const { params: { type, recruitmentId } } = match;

    const fetchCandidates = useCallback(() => {
        setLoading(LOADING);
        CandidateService.fetchCandidates()
            .then((result) => {
                setCandidates(result);
                setLoading(DONE);
            });
    }, [setLoading]);

    useEffect(() => {
        fetchCandidates();
    }, [fetchCandidates]);

    const handleSendClick = useCallback(() => {
        setLoading(LOADING);
        FormInvitationService.inviteCandidates(candidates.filter(c => c.selected), recruitmentId, type)
            .then((response) => {
                setLoading(DONE);
                onUpdateProject(response);
            });
    }, [candidates, onUpdateProject, recruitmentId, setLoading, type]);

    const handleSelectRow = useCallback(id => (e, value) => {
        e.stopPropagation();
        const proxyCandidate = candidates.find(candidate => candidate.id === id);
        proxyCandidate.selected = value;
    }, [candidates]);

    return (
        <div className={styles.candidates}>
            <PaginatedTable items={candidates} columns={columns} onSelectRow={handleSelectRow} />
            <ButtonMaterial onClick={handleSendClick} caption="Enviar email" />
        </div>
    );
};

export default Candidates;
