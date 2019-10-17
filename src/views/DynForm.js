import React, { useCallback, useReducer, useState } from 'react';
import nanoid from 'nanoid';
import { makeStyles } from '@material-ui/core';
import styles from './DynForms.module.css';
import { ButtonMaterial, InputMaterial } from '../components/uikit/UIkit';
import { MultipleQuestion, SimpleQuestion } from '../components/dynForms/Questions';
import { FormService } from '../Services/FormService';
import useValidate, { empty, minArrayLength, minStrLength } from '../context/validate';
import { DONE, LOADING } from '../context/config';

const initialState = new Map();

const emptySimpleQuestion = {
    question: '',
    Component: SimpleQuestion,
    type: 'simple',
};

const emptyMultipleQuestion = {
    question: '',
    options: [],
    Component: MultipleQuestion,
    type: 'multi',
};

const reducer = (state, action) => {
    const proxyState = new Map([...state]);
    switch (action.type) {
        case 'add':
            const id = nanoid(6);
            proxyState.set(id, { ...action.value, id });
            break;
        case 'remove':
            proxyState.delete(action.value);
            break;
        case 'update':
            proxyState.set(action.value.id, action.value);
            break;
        default:
    }
    return proxyState;
};

const generate = map => Array.from(map).map(([, value]) => value);

const useStyles = makeStyles({
    error: {
        color: 'red',
    },
});

const DynForm = ({ onUpdateProject, match, setLoading }) => {
    const classes = useStyles();
    const { params: { recruitmentId } } = match;
    const [questions, dispatchQuestion] = useReducer(reducer, initialState);
    const [title, setTitle] = useState('');
    const [errors, validate] = useValidate([minStrLength(4), empty, minArrayLength(0)]);

    const handleAddSimple = useCallback(() => {
        if (validate({ title, questions })) {
            dispatchQuestion({ value: emptySimpleQuestion, type: 'add' });
        }
    }, [questions, title, validate]);

    const handleAddMultiple = useCallback(() => {
        if (validate({ title, questions })) {
            dispatchQuestion({ value: emptyMultipleQuestion, type: 'add' });
        }
    }, [questions, title, validate]);

    const handleRemoveQuestion = useCallback(id => () => {
        dispatchQuestion({ value: id, type: 'remove' });
    }, []);

    const handleUpdateQuestion = useCallback((item) => {
        dispatchQuestion({ value: item, type: 'update' });
    }, []);

    const handleTitleChange = useCallback(() => (event) => {
        setTitle(event.target.value);
    }, []);

    const handlePostForm = useCallback(() => {
        if (validate({ title, questions })) {
            setLoading(LOADING);
            FormService.postForm({ form: { title, questions: Array.from(questions).map(([, q]) => q) }, recruitmentId })
                .then((response) => {
                    setLoading(DONE);
                    return onUpdateProject(response);
                });
        }
    }, [onUpdateProject, questions, recruitmentId, setLoading, title, validate]);

    return (
        <div className={styles.questionList}>
            <InputMaterial label="Titulo del formulario" value={title} onChange={handleTitleChange} error={errors.title} />
            <div>
                <ButtonMaterial caption="+ Pregunta simple" onClick={handleAddSimple} />
                <ButtonMaterial caption="+ Pregunta multiple" onClick={handleAddMultiple} />
            </div>
            <div className={classes.error}>{errors.questions && errors.questions.invalid ? errors.question.message : ''}</div>
            {generate(questions).map((item, idx) => {
                const { Component } = item;
                return (
                    <Component
                        onChange={handleUpdateQuestion}
                        label={`Pregunta ${idx + 1}`}
                        item={item}
                        onRemoveQuestionClick={handleRemoveQuestion}
                        key={item.id}
                    />
                );
            })}
            <ButtonMaterial caption="Guardar formulario" onClick={handlePostForm} />
        </div>
    );
};

export default DynForm;
