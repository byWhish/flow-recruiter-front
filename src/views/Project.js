import React, { useReducer } from 'react';
import styles from './Project.module.css';
import {ButtonMaterial, DateMaterial, InputMaterial, TimeMaterial} from '../components/uikit/UIkit';

const initialState = {
    title: '',
    description: '',
    initDate: new Date(),
    initTime: new Date(),
    endTime: new Date(),
};

const reducer = (state, action) => ({ ...state, [action.key]: action.value });

const Project = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onChange = field => (event) => {
        dispatch({ key: field, value: event.target.value });
    };

    const onDateTimeChange = field => (date) => {
        dispatch({ key: field, value: date });
    };

    return (
        <div className={styles.project}>
            <div className={styles.formWrapper}>
                <InputMaterial value={state.title} label="Titulo" onChange={onChange} field="title" id="title" />
                <InputMaterial value={state.description} label="Descripcion" onChange={onChange} field="description" id="description" multiline rowsMax="4" />
                <DateMaterial value={state.initDate} onChange={onDateTimeChange} field="initDate" />
                <TimeMaterial value={state.initTime} onChange={onDateTimeChange} field="initTime" />
                <TimeMaterial value={state.endTime} onChange={onDateTimeChange} field="endTime" />
                <ButtonMaterial caption="Crear proyecto" />
            </div>
        </div>
    );
};

export default Project;
