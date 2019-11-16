import React, { useEffect, useState } from 'react';
import { CandidateService } from '../Services/CandidateService';
import styles from './Candidates.module.css';
import { PaginatedTable } from '../components/table/Tables';
import LoadingModal from '../components/uikit/LoadingModal';
import { DONE, LOADING, UNLOAD } from '../context/config';

const columns = [
    {
        id: 'email',
        label: 'Email',
        minWidth: 120,
        align: 'left',
    },
];

const CandidatesList = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(UNLOAD);

    useEffect(() => {
        setLoading(LOADING);
        CandidateService.fetchCandidates()
            .then((result) => {
                setCandidates(result);
                setLoading(DONE);
            });
    }, []);

    return (
        <div className={styles.candidates}>
            <PaginatedTable items={candidates} columns={columns} />
            <LoadingModal state={loading} />
        </div>
    );
};

export default CandidatesList;
