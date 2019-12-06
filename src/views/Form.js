import React, { useCallback, useEffect, useReducer, useState } from 'react';
import * as queryString from 'query-string';
import styles from './Form.module.css';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial } from '../components/uikit/UIkit';
import { FinalMultipleQuestion, FinalSimpleQuestion } from '../components/dynForms/Questions';
import LoadingModal from '../components/uikit/LoadingModal';
import { DONE, ERROR, LOADING, UNLOAD, URLS } from '../context/config';
import useValidate, { empty, minStrLength } from '../context/validate';
import history from '../context/History';
import {Typography} from "@material-ui/core";

const reducer = (state, action) => {
    switch (action.type) {
        case 'replace':
            return action.values;
        case 'update':
            const proxy = state.find(item => item.id === action.id);
            proxy.response = action.value;
            return [...state];
        default:
            return state;
    }
};

const Form = ({ location }) => {
    const { search } = location;
    const { thanks } = URLS;
    const queryParams = queryString.parse(search);
    const [questions, dispatchQuestions] = useReducer(reducer, []);
    const [loading, setLoading] = useState(UNLOAD);
    const [errors, validate] = useValidate([minStrLength(2), empty]);
    const [recruitmentId, setRecruitmentId] = useState(null);
    const [title, setTitle] = useState(null);

    const handleChange = id => (event) => {
        dispatchQuestions({ type: 'update', id, value: event.target.value });
    };

    const handleSendClick = useCallback(() => {
        if (questions.every(question => validate({ [question.id]: question.response }))) {
            setLoading(LOADING);
            FormInvitationService.sendForm(questions, queryParams.id, recruitmentId)
                .then(() => {
                    setLoading(DONE);
                    history.push(thanks);
                });
        }
    }, [queryParams.id, questions, recruitmentId, thanks, validate]);

    const fetchForm = useCallback(() => {
        setLoading(LOADING);
        FormInvitationService.getForm(queryParams.id)
            .then((response) => {
                dispatchQuestions({ type: 'replace', values: response.form.questions });
                setTitle(response.form.title);
                setRecruitmentId(response.recruitmentId);
                setLoading(DONE);
            })
            .catch(() => { setLoading(ERROR); });
    }, [queryParams.id]);

    useEffect(() => {
        fetchForm();
    }, [fetchForm]);

    return (
        <div className={styles.form}>
            <Typography style={{ fontSize: '2rem' }}>Favor de completar el formulario</Typography>
            <Typography>{title}</Typography>
            <form className={styles.container} noValidate autoComplete="off">
                {questions.map(question => (question.options
                    ? <FinalMultipleQuestion item={question} onChange={handleChange} error={errors[question.id]} />
                    : <FinalSimpleQuestion item={question} onChange={handleChange} error={errors[question.id]} />))
                }
                <ButtonMaterial onClick={handleSendClick} caption="Enviar" />
            </form>
            <LoadingModal state={loading} />
        </div>
    );
};

export default Form;
