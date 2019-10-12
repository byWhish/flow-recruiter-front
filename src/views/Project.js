import React, { useCallback, useReducer } from 'react';
import nanoid from 'nanoid';
import styles from './Project.module.css';
import { ButtonMaterial, DateMaterial, InputMaterial, SelectMaterial, TimeSlider } from '../components/uikit/UIkit';
import { SimpleTable } from '../components/table/Tables';
import { ProjectService } from '../Services/ProjectService';
import useValidate, { empty, minLength } from '../context/validate';

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
        id: 'id',
        label: 'id',
        minWidth: 40,
        align: 'left',
    },
    {
        id: 'date',
        label: 'date',
        minWidth: 130,
        align: 'left',
        format: value => value.toLocaleString(),
    },
    {
        id: 'timeRange',
        label: 'timeRange',
        minWidth: 50,
        align: 'left',
        format: value => `${value[0]} a ${value[1]}`,
    },
    {
        id: 'duration',
        label: 'duration',
        minWidth: 50,
        align: 'left',
        format: value => `${value} min`,
    },
];

const reducer = (state, action) => ({ ...state, [action.key]: action.value });

const arrayReducer = (state, action) => {
    const proxyState = [...state];
    switch (action.type) {
        case 'add':
            proxyState.push({ ...action.value, id: nanoid(8) });
            return proxyState;
        case 'remove':
            return proxyState.filter(item => item.id !== action.id);
        default:
            return false;
    }
};

const Project = ({ onUpdateProject }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [schedule, dispatchSchedule] = useReducer(reducer, initialSchedule);
    const [list, dispatchList] = useReducer(arrayReducer, []);
    const [errors, validate] = useValidate([empty, minLength(4)]);

    const onChange = useCallback(field => (event, value) => {
        dispatch({ key: field, value: event.target.value || value });
    }, []);

    const onChangeSchedule = useCallback(field => (event, value) => {
        dispatchSchedule({ key: field, value: event.target.value || value });
    }, []);

    const onDateTimeChange = useCallback(field => (date) => {
        dispatchSchedule({ key: field, value: date });
    }, []);

    const handleCreateClick = useCallback(() => {
        if (validate(state)) {
            ProjectService.postProject({ project: state, schedulesList: list }).then(response => onUpdateProject(response));
        }
    }, [list, onUpdateProject, state, validate]);

    const handleAddScheduleClick = useCallback(() => {
        dispatchList({ type: 'add', value: schedule });
    }, [schedule]);

    const handleRemoveScheduleClick = useCallback(id => () => {
        dispatchList({ type: 'remove', id });
    }, []);

    return (
        <div className={styles.project}>
            <div className={styles.formWrapper}>
                <InputMaterial value={state.title} label="Titulo" onChange={onChange} field="name" id="name" error={errors.name} />
                <InputMaterial value={state.description} label="Descripcion" onChange={onChange} field="description" id="description" multiline rowsMax="4" error={errors.description} />
                <DateMaterial value={schedule.initDate} onChange={onDateTimeChange} field="initDate" />
                <TimeSlider value={schedule.timeRange} onChange={onChangeSchedule} field="timeRange" />
                <SelectMaterial value={schedule.duration} onChange={onChangeSchedule} label="Duracion" items={durations} field="duration" />
                <ButtonMaterial caption="Agregar" onClick={handleAddScheduleClick} />
                <SimpleTable columns={columns} rows={list} removeAction={handleRemoveScheduleClick} />
                <ButtonMaterial caption="Crear proyecto" onClick={handleCreateClick} />
            </div>
        </div>
    );
};

export default Project;
