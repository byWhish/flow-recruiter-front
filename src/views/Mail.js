import React, { useReducer, useCallback } from 'react';
import styles from './Mail.module.css';
import { ButtonMaterial, InputMaterial } from '../components/uikit/UIkit';
import { ProjectService } from '../Services/ProjectService';
import useValidate, { empty, minStrLength } from '../context/validate';

const reducer = (state, action) => ({ ...state, [action.key]: action.value });

const initialState = {
    title: '',
    message: '',
    label: '',
};

const Mail = ({ match, onUpdateProject, setLoading }) => {
    const { params: { type, recruitmentId } } = match;
    const [mail, dispatch] = useReducer(reducer, initialState);
    const [errors, validate] = useValidate([minStrLength(4), empty]);

    const handleChange = useCallback(field => (event, value) => {
        dispatch({ key: field, value: event.target.value || value });
    }, []);

    const handleClick = useCallback(() => {
        if (validate(mail)) {
            setLoading(true);
            ProjectService.saveMail(mail, recruitmentId, type)
                .then((response) => {
                    setLoading(false);
                    return onUpdateProject(response);
                });
        }
    }, [mail, onUpdateProject, recruitmentId, setLoading, type, validate]);


    return (
        <div className={styles.mailWrapper}>
            <InputMaterial label="Titulo" onChange={handleChange} value={mail.title} field="title" id="title" error={errors.title} />
            <InputMaterial label="Mensaje" onChange={handleChange} value={mail.message} field="message" id="message" multiline error={errors.message} />
            <InputMaterial label="Texto link" onChange={handleChange} value={mail.label} field="label" id="label" error={errors.label} />
            <ButtonMaterial caption="Guardar" onClick={handleClick} />
        </div>
    );
};

export default Mail;
