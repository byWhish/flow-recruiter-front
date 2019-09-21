import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '../components/table/Tables';
import { ProjectService } from '../Services/ProjectService';
import styles from './ProjectList.module.css';
import Loading from '../components/uikit/Loading';

const columns = [{
    id: 'id',
    label: 'id',
    minWidth: 120,
    align: 'left',
},
{
    id: 'timestamp',
    label: 'timestamp',
    minWidth: 120,
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
    id: 'description',
    label: 'description',
    minWidth: 120,
    align: 'left',
}];

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState('pending');

    useEffect(() => {
        ProjectService.getProjects()
            .then((response) => {
                setProjects(response);
                setLoading('done');
            });
    }, []);

    if (loading === 'pending') return <Loading />;

    return (
        <div className={styles.projectList}>
            <PaginatedTable items={projects} columns={columns} />
        </div>
    );
};

export default ProjectList;
