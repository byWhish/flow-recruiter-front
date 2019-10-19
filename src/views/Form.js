import React, { useCallback, useEffect, useReducer, useState } from 'react';
import * as queryString from 'query-string';
import styles from './Form.module.css';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial } from '../components/uikit/UIkit';
import { FinalMultipleQuestion, FinalSimpleQuestion } from '../components/dynForms/Questions';
import LoadingModal from '../components/uikit/LoadingModal';
import {DONE, ERROR, LOADING, UNLOAD} from '../context/config';
import useValidate, { empty, minStrLength } from '../context/validate';

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
    const queryParams = queryString.parse(search);
    const [form, setForm] = useState(null);
    const [questions, dispatchQuestions] = useReducer(reducer, []);
    const [loading, setLoading] = useState(UNLOAD);
    const [errors, validate] = useValidate([minStrLength(2), empty]);

    const handleChange = id => (event) => {
        dispatchQuestions({ type: 'update', id, value: event.target.value });
    };

    const handleSendClick = () => {
        if (questions.every(question => validate({ [question.id]: question.response }))) {
            setLoading(LOADING);
            FormInvitationService.sendForm(questions, form)
                .then(() => {
                    setLoading(DONE);
                });
        }
    };

    const fetchForm = useCallback(() => {
        setLoading(LOADING);
        FormInvitationService.getForm(queryParams.id)
            .then((response) => {
                setForm(response);
                dispatchQuestions({ type: 'replace', values: response.form.questions });
                setLoading(DONE);
            })
            .catch(error => {
                alert(error.response.data.message);
                setLoading(ERROR);
            });
    }, [queryParams.id]);

    useEffect(() => {
        fetchForm();
    }, [fetchForm]);

    return (
        <div className={styles.form}>
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
