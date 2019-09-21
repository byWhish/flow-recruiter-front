import React, { useReducer, useCallback } from 'react';
import styles from './Mail.module.css';
import { ButtonMaterial, InputMaterial } from '../components/uikit/UIkit';
import { ProjectService } from '../Services/ProjectService';

const reducer = (state, action) => ({ ...state, [action.key]: action.value });

const initialState = {
    title: '',
    message: '',
    label: '',
};

const Mail = ({ match }) => {
    const { params: { type } } = match;
    const [mail, dispatch] = useReducer(reducer, initialState);

    const handleChange = useCallback(field => (event, value) => {
        dispatch({ field, value });
        dispatch({ key: field, value: event.target.value || value });
    }, []);

    const handleClick = useCallback(() => {
        ProjectService.saveMail(mail, type);
    }, [mail, type]);

    return (
        <div className={styles.mailWrapper}>
            <InputMaterial label="Titulo" onChange={handleChange} value={mail.title} field="title" id="title" />
            <InputMaterial label="Mensaje" onChange={handleChange} value={mail.message} field="message" id="message" />
            <InputMaterial label="Texto link" onChange={handleChange} value={mail.label} field="label" id="label" />
            <ButtonMaterial caption="Guardar" onClick={handleClick} />
        </div>
    );
};

export default Mail;
