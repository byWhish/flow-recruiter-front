import React, { useCallback, useEffect, useState } from 'react';
import * as queryString from 'query-string';
import styles from './Form.module.css';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial, InputMaterial, SelectMaterial } from '../components/uikit/UIkit';
import { FinalMultipleQuestion, FinalSimpleQuestion } from '../components/dynForms/Questions';

const Form = ({ location }) => {
    const { search } = location;
    const queryParams = queryString.parse(search);
    const [form, setForm] = useState(null);
    const [questions, setQuestions] = useState([]);

    const handleChange = name => (event) => {
    };

    const handleSendClick = () => {
        FormInvitationService.sendForm(queryParams.id).then(() => alert('Ok'));
    };

    const fetchForm = useCallback(() => {
        FormInvitationService.getForm(queryParams.id)
            .then((response) => {
                setForm(response);
                setQuestions(response.questions);
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
