import React, {useCallback, useEffect, useReducer, useState} from 'react';
import * as queryString from 'query-string';
import styles from './Form.module.css';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial, InputMaterial, SelectMaterial } from '../components/uikit/UIkit';
import { FinalMultipleQuestion, FinalSimpleQuestion } from '../components/dynForms/Questions';

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

    const handleChange = id => (event) => {
        dispatchQuestions({ type: 'update', id, value: event.target.value });
    };

    const handleSendClick = () => {
        FormInvitationService.sendForm(questions, form).then(() => alert('Ok'));
    };

    const fetchForm = useCallback(() => {
        FormInvitationService.getForm(queryParams.id)
            .then((response) => {
                setForm(response);
                dispatchQuestions({ type: 'replace', values: response.form.questions });
            });
    }, [queryParams.id]);

    useEffect(() => {
        fetchForm();
    }, [fetchForm]);

    return (
        <div className={styles.form}>
            <form className={styles.container} noValidate autoComplete="off">
                {questions.map(question => (question.options
                    ? <FinalMultipleQuestion item={question} onChange={handleChange} />
                    : <FinalSimpleQuestion item={question} onChange={handleChange} />))
                }
                <ButtonMaterial onClick={handleSendClick} caption="Enviar" />
            </form>
        </div>
    );
};

export default Form;
