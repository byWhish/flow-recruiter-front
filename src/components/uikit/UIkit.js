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
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from '@material-ui/core/Slider';

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
        width: 200,
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

export const SelectMaterial = ({ label, value, onChange, items, field }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange(field)}
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
};

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
        width: 500,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export const TimeSlider = ({ field, value, onChange }) => (
    <PrettoSlider
        min={9}
        max={18}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={value}
        step={1}
        onChange={onChange(field)}
    />
);
