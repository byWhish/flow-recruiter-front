import React, { useCallback, useEffect, useState } from 'react';
import styles from './Candidates.module.css';
import { PaginatedTable } from '../components/table/Tables';
import FormInvitationService from '../Services/FormInvitationService';
import { AutocompleteMaterial, ButtonMaterial, PillList } from '../components/uikit/UIkit';
import { DONE, LOADING } from '../context/config';
import FilterService from '../Services/FiltersService';
import { CandidateService } from '../Services/CandidateService';

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

const Candidates = ({ match, onUpdateProject, setLoading, fetchCandidates, filtered, project, setNextTab, history }) => {
    const [candidates, setCandidates] = useState([]);
    const [activeFilters, setActiveFilters] = useState(new Set());
    const [filters, setFilters] = useState([]);
    const [filter, setFilter] = useState('');
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState('');

    const { params: { type, recruitmentId } } = match;

    const handleFetchCandidates = useCallback(() => {
        setLoading(LOADING);
        fetchCandidates()
            .then((result) => {
                setCandidates(result);
                setLoading(DONE);
            });
        FilterService.fetchFilters()
            .then(result => setFilters(result));
    }, [fetchCandidates, setLoading]);

    const handleFilterChange = useCallback((target, value) => {
        setFilter(value);
        if (filters.includes(value)) {
            FilterService.fetchOptions(value)
                .then(response => setOptions(response));
        }
    }, [filters]);

    const handleOptionChange = useCallback((target, value) => {
        setOption(value);
    }, []);

    const fetchFiltered = useCallback((filters, recruitmentId) => {
        setLoading(LOADING);
        CandidateService.fetchFiltered(filters, recruitmentId)
            .then((response) => {
                setCandidates(response);
                setLoading(DONE);
            });
    }, [setLoading]);

    const handleAddFilter = useCallback(() => {
        const result = new Set(activeFilters);
        result.add(option);
        setActiveFilters(result);
    }, [activeFilters, option]);

    const handleDeleteActive = useCallback(value => () => {
        const result = new Set(activeFilters);
        result.delete(value);
        setActiveFilters(result);
    }, [activeFilters]);

    useEffect(() => {
        if (activeFilters.size > 0) fetchFiltered([...Array.from(activeFilters)], filtered ? recruitmentId : '');
        else handleFetchCandidates();
    }, [activeFilters, handleFetchCandidates, fetchFiltered, filtered, recruitmentId]);

    const handleSendClick = useCallback(() => {
        setLoading(LOADING);
        FormInvitationService.inviteCandidates(candidates.filter(c => c.selected), recruitmentId, type)
            .then((response) => {
                setLoading(DONE);
                onUpdateProject(response);
                // if (type === 'invite') {
                //     history.push(`/mail/${project.id}/invite`);
                // } else history.push(`/calendar/${project.id}`);
            });
    }, [candidates, onUpdateProject, recruitmentId, setLoading, type]);

    const handleSelectRow = useCallback(id => (e, value) => {
        e.stopPropagation();
        const proxyCandidate = candidates.find(candidate => candidate.id === id);
        proxyCandidate.selected = value;
    }, [candidates]);

    return (
        <div className={styles.candidates}>
            <div className={styles.filtersWrapper}>
                <AutocompleteMaterial options={filters} handleChange={handleFilterChange} value={filter} label="Selecciona filtro" />
                <AutocompleteMaterial options={options} handleChange={handleOptionChange} value={option} label="Selecciona opcion" />
                <ButtonMaterial caption="Agregar Filtro" onClick={handleAddFilter} />
            </div>
            <div className={styles.pillsWrapper}>
                <PillList items={Array.from(activeFilters)} onDelete={handleDeleteActive} />
            </div>
            <PaginatedTable items={candidates} columns={columns} onSelectRow={handleSelectRow} />
            <ButtonMaterial onClick={handleSendClick} caption="Enviar email" />
        </div>
    );
};

export default Candidates;
