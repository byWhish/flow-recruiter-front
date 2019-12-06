import React, { useCallback, useEffect, useState } from 'react';
import { CandidateService } from '../Services/CandidateService';
import styles from './Candidates.module.css';
import { PaginatedTable } from '../components/table/Tables';
import LoadingModal from '../components/uikit/LoadingModal';
import { DONE, LOADING, UNLOAD } from '../context/config';
import { AutocompleteMaterial, ButtonMaterial, PillList } from '../components/uikit/UIkit';
import FilterService from '../Services/FiltersService';

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
    const [filters, setFilters] = useState([]);
    const [filter, setFilter] = useState('');
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState('');
    const [loading, setLoading] = useState(UNLOAD);
    const [activeFilters, setActiveFilters] = useState(new Set());

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

    const fetchFiltered = useCallback((filters) => {
        setLoading(LOADING);
        CandidateService.fetchFiltered(filters)
            .then((response) => {
                setCandidates(response);
                setLoading(DONE);
            });
    }, []);

    const fetchCandidates = useCallback(() => {
        setLoading(LOADING);
        CandidateService.fetchCandidates()
            .then((result) => {
                setCandidates(result);
                setLoading(DONE);
            });
        FilterService.fetchFilters()
            .then(result => setFilters(result));
    }, []);

    const handleAddFilter = useCallback(() => {
        if (option) {
            const result = new Set(activeFilters);
            result.add(option);
            setActiveFilters(result);
        }
    }, [activeFilters, option]);

    const handleDeleteActive = useCallback(value => () => {
        const result = new Set(activeFilters);
        result.delete(value);
        setActiveFilters(result);
    }, [activeFilters]);

    useEffect(() => {
        if (activeFilters.size > 0) fetchFiltered([...Array.from(activeFilters)]);
        else fetchCandidates();
    }, [activeFilters, fetchCandidates, fetchFiltered]);

    return (
        <div className={styles.candidates}>
            <div className={styles.candidatesInnerWrapper}>
                <div className={styles.filtersWrapper}>
                    <AutocompleteMaterial options={filters} handleChange={handleFilterChange} value={filter} label="Selecciona filtro" />
                    <AutocompleteMaterial options={options} handleChange={handleOptionChange} value={option} label="Selecciona opcion" />
                    <ButtonMaterial caption="Agregar Filtro" onClick={handleAddFilter} />
                </div>
                <div className={styles.pillsWrapper}>
                    <PillList items={Array.from(activeFilters)} onDelete={handleDeleteActive} />
                </div>
                <PaginatedTable items={candidates} columns={columns} />
                <LoadingModal state={loading} />
            </div>
        </div>
    );
};

export default CandidatesList;
