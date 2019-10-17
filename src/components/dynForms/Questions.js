import React, { useCallback, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Question.module.css';
import { ButtonMaterial, InputMaterial, ListMaterial, SelectMaterial } from '../uikit/UIkit';
import useValidate, { empty, minStrLength } from '../../context/validate';

export const FinalSimpleQuestion = ({ item, onChange }) => <InputMaterial label={item.label} onChange={onChange} value={item.response} field={item.id} id={item.id} multiline />;

export const FinalMultipleQuestion = ({ item, onChange }) => (
    <SelectMaterial value={item.response} onChange={onChange} label={item.label} items={item.options} field={item.id} />
);

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
    const [errors, validate] = useValidate([minStrLength(4), empty]);

    const handleOptionChange = useCallback(() => (event) => {
        setOption(event.target.value);
    }, []);

    const handleQuestionChange = useCallback(() => (event) => {
        const proxyItem = { ...item, question: event.target.value };
        onChange(proxyItem);
    }, [item, onChange]);

    const handleAddClick = useCallback(() => {
        if (validate({ option, question: item.question })) {
            const proxyItem = { ...item };
            proxyItem.options.push(option);
            setOption('');
            onChange(proxyItem);
        }
    }, [item, onChange, option, validate]);

    const handleDeleteClick = useCallback(selected => () => {
        const proxyItem = { ...item };
        proxyItem.options = proxyItem.options.filter(opt => opt !== selected);
        setOption('');
        onChange(proxyItem);
    }, [item, onChange]);

    return (
        <div className={styles.multipleQuestion}>
            <div className={styles.header}>
                <InputMaterial label={label} onChange={handleQuestionChange} value={item.question} field="question" id={item.id} multiline error={errors.question} />
                <DeleteIcon onClick={onRemoveQuestionClick(item.id)} />
            </div>
            <div className={styles.option}>
                <InputMaterial label="Opcion" onChange={handleOptionChange} value={option} field="option" id={item.id} multiline error={errors.option} />
                <ButtonMaterial caption="Agregar" onClick={handleAddClick} />
            </div>
            <div className={styles.list}>
                <ListMaterial items={item.options} onDeleteClick={handleDeleteClick} width={400} />
            </div>
        </div>
    );
};
