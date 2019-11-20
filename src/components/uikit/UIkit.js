import Button from '@material-ui/core/Button';
import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';


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

export const InputMaterial = ({ onChange, value, label, id, field, multiline, rowsMax, error, disabled }) => {
    const classes = useStyles();
    return (
        <TextField
            error={error.invalid}
            disabled={disabled}
            id={id}
            label={error.invalid ? error.message : label}
            className={classes.textField}
            value={value}
            onChange={onChange(field)}
            margin="normal"
            multiline={multiline}
            rowsMax={rowsMax}
        />
    );
};

InputMaterial.propTypes = {
    error: PropTypes.object,
};

InputMaterial.defaultProps = {
    error: {},
};


export const SelectMaterial = ({ label, value, onChange, items, field, error }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">{error.invalid ? error.message : label}</InputLabel>
            <Select
                error={error.invalid}
                value={value}
                onChange={onChange(field)}
            >
                { items.map(item => <MenuItem key={item.value || item} value={item.value || item}>{item.label || item}</MenuItem>) }
            </Select>
        </FormControl>
    );
};

SelectMaterial.propTypes = {
    error: PropTypes.object,
    onChange: PropTypes.func,
};

SelectMaterial.defaultProps = {
    error: {},
    onChange: () => {},
};

export const DateMaterial = ({ value, onChange, field, error, label, disabled }) => {
    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                error={error.invalid}
                disabled={disabled}
                margin="normal"
                id="date-picker-dialog"
                label={error.invalid ? error.message : label}
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

DateMaterial.propTypes = {
    error: PropTypes.object,
};

DateMaterial.defaultProps = {
    error: {},
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
        color: '#3f51b5',
        height: 8,
        width: 400,
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
    <div style={{ marginTop: '30px' }}>
        <Typography>Elige una franja horaria</Typography>
        <PrettoSlider
            min={9}
            max={18}
            valueLabelDisplay="auto"
            // aria-label="pretto slider"
            value={value}
            step={1}
            onChange={onChange(field)}
        />
    </div>
);

export const ListMaterial = ({ dense, items, onDeleteClick, width }) => (
    <List dense={dense} style={{ width }}>
        {items.map(item => (
            <ListItem key={item}>
                <ListItemText
                    primary={item}
                />
                <ListItemIcon>
                    <DeleteIcon onClick={onDeleteClick(item)} />
                </ListItemIcon>
            </ListItem>
        ))}
    </List>
);

ListMaterial.propTypes = {
    onDeleteClick: PropTypes.func,
};

ListMaterial.defaultProps = {
    onDeleteClick: () => {},
};

export const AutocompleteMaterial = ({ options, handleChange, value, label }) => (
    <Autocomplete
        id="combo-box-demo"
        options={options}
        value={value}
        onChange={handleChange}
        getOptionLabel={option => option}
        style={{ width: 200, backgroundColor: 'white' }}
        renderInput={params => (
            <TextField {...params} label={label} variant="outlined" fullWidth />
        )}
    />
);

export const PillList = ({ items, onDelete }) => items.map(item => (
    <Chip
        label={item}
        onDelete={onDelete(item)}
    />
));
