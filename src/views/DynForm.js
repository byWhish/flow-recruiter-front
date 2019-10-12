import React, { useCallback, useReducer, useState } from 'react';
import nanoid from 'nanoid';
import styles from './ProjectList.module.css';
import { ButtonMaterial, InputMaterial } from '../components/uikit/UIkit';
import { MultipleQuestion, SimpleQuestion } from '../components/dynForms/Questions';
import { FormService } from '../Services/FormService';

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

const DynForm = ({ onUpdateProject, match }) => {
    const { params: { recruitmentId } } = match;
    const [questions, dispatchQuestion] = useReducer(reducer, initialState);
    const [title, setTitle] = useState('');

    const handleAddSimple = useCallback(() => {
        dispatchQuestion({ value: emptySimpleQuestion, type: 'add' });
    }, []);

    const handleAddMultiple = useCallback(() => {
        dispatchQuestion({ value: emptyMultipleQuestion, type: 'add' });
    }, []);

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
        FormService.postForm({ form: { title, questions: Array.from(questions).map(([, q]) => q) }, recruitmentId })
            .then(response => onUpdateProject(response));
    }, [onUpdateProject, questions, recruitmentId, title]);

    return (
        <div className={styles.questionList}>
            <InputMaterial label="Titulo del formulario" value={title} onChange={handleTitleChange} />
            <ButtonMaterial caption="Agregar pregunta simple" onClick={handleAddSimple} />
            <ButtonMaterial caption="Agregar pregunta multiple" onClick={handleAddMultiple} />
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
