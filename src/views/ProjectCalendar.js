import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { SimpleTable } from '../components/table/Tables';
import { CheckIcon, CloseIcon } from '../components/Icons/Icons';
import styles from './ProjectCalendar.module.css';

const columns = [
    {
        id: 'time',
        label: 'Dia',
        minWidth: 130,
        align: 'center',
        format: value => format(value, 'dd/MM/yyyy'),
    },
    {
        id: 'time',
        label: 'Turno',
        minWidth: 130,
        align: 'center',
        format: value => format(value, 'HH:mm'),
    },
    {
        id: 'free',
        label: 'Estado',
        minWidth: 50,
        align: 'center',
        format: value => (value ? <CloseIcon /> : <CheckIcon />),
    },
];

const ProjectCalendar = ({ project }) => {
    const schedules = useMemo(() => project.schedules.reduce((prev, current) => [...prev, ...current.blocks], []), [project.schedules]);

    return (
        <div className={styles.calendar}>
            <SimpleTable columns={columns} rows={schedules} />
        </div>
    );
};

export default ProjectCalendar;
