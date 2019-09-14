import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './Form.css';
import Button from '@material-ui/core/Button';
import FormInvitationService from '../Services/FormInvitationService';
import {ButtonMaterial} from "../components/uikit/UIkit";
import * as queryString from "query-string";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Form = ({ location }) => {
    const classes = useStyles();
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
        <div className="form">
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('surname')}
                    margin="normal"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Edad</InputLabel>
                    <Select
                        value={values.age}
                        onChange={handleChange}
                        inputProps={{
                            name: 'edad',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <ButtonMaterial onClick={handleSendClick} caption="Enviar" />
            </form>
        </div>
    );
};

export default Form;
