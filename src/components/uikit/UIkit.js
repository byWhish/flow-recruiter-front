import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
        width: 200,
    },
}));

export const ButtonMaterial = ({ onClick, caption }) => {
    const classes = useStyles();
    return (
        <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>
            {caption}
        </Button>
    );
};

export const InputMaterial = ({ onChange, value, label, id, field, multiline, rowsMax }) => {
    const classes = useStyles();
    return (
        <TextField
            id={id}
            label={label}
            className={classes.textField}
            value={value}
            onChange={onChange(field)}
            margin="normal"
            multiline={multiline}
            rowsMax={rowsMax}
        />
    );
};

export const SelectMaterial = ({ label, value, onChange, inputProps, items }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                inputProps={{
                    name: inputProps.name,
                    id: inputProps.id,
                }}
            >
                { items.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>) }
            </Select>
        </FormControl>
    );
};

export const DateMaterial = ({ value, onChange, field }) => {
    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={value}
                onChange={onChange(field)}
                className={classes.textField}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export const TimeMaterial = ({ value, onChange, field }) => {
    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={value}
                className={classes.textField}
                onChange={onChange(field)}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
