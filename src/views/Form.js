import React from 'react';
import * as queryString from 'query-string';
import styles from './Form.module.css';
import FormInvitationService from '../Services/FormInvitationService';
import { ButtonMaterial, InputMaterial, SelectMaterial } from '../components/uikit/UIkit';

const items = [
    { id: 10, label: 'Diez' },
    { id: 20, label: 'Veinte' },
    { id: 30, label: 'Treinta' },
];

const Form = ({ location }) => {
    const { search } = location;
    const queryParams = queryString.parse(search);
    const [values, setValues] = React.useState({
        name: 'Nombre',
        surname: 'Apellido',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    });
    const handleChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSendClick = () => {
        FormInvitationService.sendForm(queryParams.id).then(() => alert('Ok'));
    };

    return (
        <div className={styles.form}>
            <form className={styles.container} noValidate autoComplete="off">
                <InputMaterial
                    id="standard-name"
                    label="Nombre"
                    value={values.name}
                    onChange={handleChange}
                />
                <InputMaterial
                    id="standard-surname"
                    label="Apellido"
                    value={values.surname}
                    onChange={handleChange}
                />
                <SelectMaterial
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                    label="Edad"
                    items={items}
                    value={values.age}
                />
                <ButtonMaterial onClick={handleSendClick} caption="Enviar" />
            </form>
        </div>
    );
};

export default Form;
