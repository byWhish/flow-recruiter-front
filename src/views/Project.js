import React, { useCallback, useEffect, useReducer } from 'react';
import nanoid from 'nanoid';
import { format, startOfDay } from 'date-fns';
import styles from './Project.module.css';
import { ButtonMaterial, DateMaterial, InputMaterial, SelectMaterial, TimeSlider } from '../components/uikit/UIkit';
import { SimpleTable } from '../components/table/Tables';
import useValidate, { empty, minArrayLength, minDate, minStrLength } from '../context/validate';
import { ProjectService } from '../Services/ProjectService';
import { DONE, LOADING } from '../context/config';

const initialState = {
    name: '',
    description: '',
};

const initialSchedule = {
    date: new Date(),
    timeRange: [9, 18],
    duration: 30,
};

const durations = [
    { value: 15, label: 15 },
    { value: 30, label: 30 },
    { value: 60, label: 60 },
];

const columns = [
    {
        id: 'date',
        label: 'Fecha',
        minWidth: 130,
        align: 'left',
        format: value => format(value, 'dd/MM/yyyy'),
    },
    {
        id: 'init',
        label: 'Hora inicio',
        minWidth: 50,
        align: 'center',
        format: value => `${value}:00`,
    },
    {
        id: 'end',
        label: 'Hora fin',
        minWidth: 50,
        align: 'center',
        format: value => `${value}:00`,
    },
    {
        id: 'duration',
        label: 'Duracion',
        minWidth: 50,
        align: 'left',
        format: value => `${value} min`,
    },
];

const processSchedules = schedules => schedules.map(schedule => ({ ...schedule, date: new Date(schedule.date), id: nanoid(8) }));

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, [action.key]: action.value };
        case 'replace':
            return action.value;
        default:
            return state;
    }
};

const arrayReducer = (state, action) => {
    const proxyState = [...state];
    switch (action.type) {
        case 'add':
            const { date, timeRange, duration } = action.value;
            const schedule = {
                date: startOfDay(date),
                timeRange,
                duration,
                init: timeRange[0],
                end: timeRange[1],
                id: nanoid(8),
            };
            proxyState.push(schedule);
            return proxyState;
        case 'remove':
            return proxyState.filter(item => item.id !== action.id);
        case 'replace':
            return action.value;
        default:
            return false;
    }
};

const Project = ({ onUpdateProject, setLoading, edit, project }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [schedule, dispatchSchedule] = useReducer(reducer, initialSchedule);
    const [list, dispatchList] = useReducer(arrayReducer, []);
    const [errors, validate] = useValidate([minDate(new Date()), minArrayLength(1), minStrLength(4), empty]);

    const onChange = useCallback(field => (event, value) => {
        dispatch({ type: 'update', key: field, value: event.target.value || value });
    }, []);

    const onChangeSchedule = useCallback(field => (event, value) => {
        dispatchSchedule({ type: 'update', key: field, value: event.target.value || value });
    }, []);

    const onDateTimeChange = useCallback(field => (date) => {
        dispatchSchedule({ type: 'update', key: field, value: date });
    }, []);

    const handleCreateClick = useCallback(() => {
        if (validate({ ...state, list })) {
            setLoading(LOADING);
            ProjectService.postProject({ project: state, schedulesList: list })
                .then((response) => {
                    setLoading(DONE);
                    return onUpdateProject(response);
                });
        }
    }, [list, onUpdateProject, setLoading, state, validate]);

    const handleAddScheduleClick = useCallback(() => {
        if (validate({ date: schedule.date })) {
            dispatchList({ type: 'add', value: schedule });
        }
    }, [schedule, validate]);

    const handleRemoveScheduleClick = useCallback(id => () => {
        dispatchList({ type: 'remove', id });
    }, []);

    useEffect(() => {
        if (edit && project.schedules) {
            dispatchList({ type: 'replace', value: processSchedules(project.schedules) });
            dispatch({ type: 'replace', value: { name: project.name, description: project.description } });
        }
    }, [edit, project]);

    return (
        <div className={styles.project}>
            <div className={styles.formWrapper}>
                <InputMaterial value={state.name} label="Titulo" onChange={onChange} field="name" id="name" error={errors.name} disabled={edit} />
                <InputMaterial value={state.description} label="Descripcion" onChange={onChange} field="description" id="description" multiline rowsMax="4" error={errors.description} disabled={edit} />
                <DateMaterial value={schedule.date} label="Fecha combocatoria" onChange={onDateTimeChange} field="date" error={errors.date} disabled={edit} />
                {!edit && <TimeSlider value={schedule.timeRange} onChange={onChangeSchedule} field="timeRange" />}
                {!edit && <SelectMaterial value={schedule.duration} onChange={onChangeSchedule} label="Duracion" items={durations} field="duration" />}
                {!edit && <ButtonMaterial caption="Agregar" onClick={handleAddScheduleClick} />}
                <SimpleTable columns={columns} rows={list} remove removeAction={handleRemoveScheduleClick} error={errors.list} />
                {!edit && <ButtonMaterial caption="Guardar proyecto" onClick={handleCreateClick} />}
            </div>
        </div>
    );
};

export default Project;
