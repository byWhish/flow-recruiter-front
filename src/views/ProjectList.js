import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '../components/table/Tables';
import { ProjectService } from '../Services/ProjectService';

const columns = [{
    id: 'id',
    label: 'id',
    minWidth: 120,
    align: 'left',
    format: value => value.toLocaleString(),
},
{
    id: 'name',
    label: 'name',
    minWidth: 120,
    align: 'left',
    format: value => value.toFixed(2),
}];

const ProjectList = () => {
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        ProjectService.getProjects()
            .then((response) => {
                setProjects(response);
            });
    }, []);

    return (
        <div>
            <PaginatedTable items={projects} columns={columns} />
        </div>
    );
};

export default ProjectList;
