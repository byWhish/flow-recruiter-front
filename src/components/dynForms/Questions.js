import React, { useCallback, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Question.module.css';
import { ButtonMaterial, InputMaterial, ListMaterial } from '../uikit/UIkit';

export const SimpleQuestion = ({ label, onChange, item, onRemoveQuestionClick }) => {
    const handleChange = useCallback(() => (event) => {
        const proxyItem = { ...item, question: event.target.value };
        onChange(proxyItem);
    }, [item, onChange]);

    return (
        <div className={styles.simpleQuestion}>
            <InputMaterial label={label} onChange={handleChange} value={item.question} field={item.id} id={item.id} multiline />
            <DeleteIcon onClick={onRemoveQuestionClick(item.id)} />
        </div>
    );
};

export const MultipleQuestion = ({ label, onChange, item, onRemoveQuestionClick }) => {
    const [option, setOption] = useState('');

    const handleOptionChange = useCallback(() => (event) => {
        setOption(event.target.value);
    }, []);

    const handleQuestionChange = useCallback(() => (event) => {
        const proxyItem = { ...item, question: event.target.value };
        onChange(proxyItem);
    }, [item, onChange]);

    const handleAddClick = useCallback(() => {
        const proxyItem = { ...item };
        proxyItem.options.push(option);
        setOption('');
        onChange(proxyItem);
    }, [item, onChange, option]);

    const handleDeleteClick = useCallback(selected => () => {
        const proxyItem = { ...item };
        proxyItem.options = proxyItem.options.filter(opt => opt !== selected);
        setOption('');
        onChange(proxyItem);
    }, [item, onChange]);

    return (
        <div className={styles.multipleQuestion}>
            <InputMaterial label={label} onChange={handleQuestionChange} value={item.question} field={item.id} id={item.id} multiline />
            <InputMaterial label="Opcion" onChange={handleOptionChange} value={option} field={item.id} id={item.id} multiline />
            <ButtonMaterial caption="Agregar" onClick={handleAddClick} />
            <ListMaterial items={item.options} onDeleteClick={handleDeleteClick} />
            <DeleteIcon onClick={onRemoveQuestionClick(item.id)} />
        </div>
    );
};
