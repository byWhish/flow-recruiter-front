import React, { useReducer, useCallback, useEffect, useState } from 'react';
import styles from './Mail.module.css';
import { ButtonMaterial, InputMaterial } from '../components/uikit/UIkit';
import { ProjectService } from '../Services/ProjectService';
import useValidate, { empty, minStrLength } from '../context/validate';
import { DONE, LOADING } from '../context/config';

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

const initialState = {
    title: '',
    message: '',
    label: '',
};

const Mail = ({ match, onUpdateProject, setLoading, edit, project, setNextTab, history }) => {
    const { params: { type, recruitmentId } } = match;
    const [mail, dispatch] = useReducer(reducer, initialState);
    const [errors, validate] = useValidate([minStrLength(4), empty]);
    const [disabled, setDisabled] = useState(false);

    const handleChange = useCallback(field => (event, value) => {
        dispatch({ type: 'update', key: field, value: event.target.value || value });
    }, []);

    const handleClick = useCallback(() => {
        if (validate(mail)) {
            setLoading(LOADING);
            ProjectService.saveMail(mail, recruitmentId, type)
                .then((response) => {
                    setLoading(DONE);
                    onUpdateProject(response);
                    setNextTab();
                    if (type === 'form') history.push(`/candidates/${project.id}/invite`); else history.push(`/interested/${project.id}/summon`);
                });
        }
    }, [mail, onUpdateProject, recruitmentId, setLoading, type, validate]);

    useEffect(() => {
        if (edit && type === 'form' && project.hasFormMail) {
            dispatch({ type: 'replace', value: project.formMail });
            setDisabled(project.hasFormMail && edit);
        } else if (edit && type === 'invite' && project.hasInvitationMail) {
            dispatch({ type: 'replace', value: project.invitationMail });
            setDisabled(project.hasInvitationMail && edit);
        }
    }, [edit, project.formMail, project.hasFormMail, project.hasInvitationMail, project.invitationMail, type]);

    return (
        <div className={styles.mailWrapper}>
            <InputMaterial label="Titulo" onChange={handleChange} value={mail.title} field="title" id="title" error={errors.title} disabled={disabled} />
            <InputMaterial label="Mensaje" onChange={handleChange} value={mail.message} field="message" id="message" multiline error={errors.message} disabled={disabled} />
            <InputMaterial label="Texto link" onChange={handleChange} value={mail.label} field="label" id="label" error={errors.label} disabled={disabled} />
            {!disabled && <ButtonMaterial caption="Guardar" onClick={handleClick} />}
        </div>
    );
};

export default Mail;
