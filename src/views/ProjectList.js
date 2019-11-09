import React, { useCallback, useEffect, useState } from 'react';
import { PaginatedTable } from '../components/table/Tables';
import { ProjectService } from '../Services/ProjectService';
import styles from './ProjectList.module.css';
import { DONE, LOADING, UNLOAD } from '../context/config';
import LoadingModal from '../components/uikit/LoadingModal';
import { CheckIcon, CloseIcon } from '../components/Icons/Icons';
import history from '../context/History';

const columns = [
    {
        id: 'id',
        label: 'id',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'timestamp',
        label: 'timestamp',
        minWidth: 50,
        align: 'left',
        format: value => new Date(...value).toLocaleString(),
    },
    {
        id: 'name',
        label: 'name',
        minWidth: 120,
        align: 'left',
    },
    {
        id: 'hasForm',
        label: 'Form',
        minWidth: 50,
        align: 'center',
        format: value => (value ? <CheckIcon /> : <CloseIcon />),
    },
    {
        id: 'hasFormMail',
        label: 'Mail Form',
        minWidth: 50,
        align: 'center',
        format: value => (value ? <CheckIcon /> : <CloseIcon />),
    },
    {
        id: 'interested',
        label: 'Interesados',
        minWidth: 50,
        align: 'center',
        // format: value => (value ? <CheckIcon /> : <CloseIcon />),
    },
    {
        id: 'hasInvitationMail',
        label: 'Invitation Mail',
        minWidth: 50,
        align: 'center',
        format: value => (value ? <CheckIcon /> : <CloseIcon />),
    },
];

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(UNLOAD);

    const fetchProjects = useCallback(() => {
        setLoading(LOADING);
        ProjectService.getProjects()
            .then((response) => {
                setProjects(response);
                setLoading(DONE);
            });
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // const handleSelectRow = useCallback(id => (e, value) => {
    //     e.stopPropagation();
    //     const proxyCandidate = projects.find(project => project.id === id);
    //     proxyCandidate.selected = value;
    // }, [projects]);

    const handleEditClick = useCallback(id => () => {
        history.push(`/projects/edit/${id}`);
    }, []);

    const handleRemoveClick = useCallback(id => () => {
        setLoading(LOADING);
        ProjectService.removeProject(id)
            .then((response) => {
                setProjects(response);
                setLoading(DONE);
            });
    }, []);

    return (
        <div className={styles.projectList}>
            <PaginatedTable items={projects} columns={columns} width="90%" remove edit editAction={handleEditClick} removeAction={handleRemoveClick} />
            <LoadingModal state={loading} />
        </div>
    );
};

export default ProjectList;
