import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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

export const InputMaterial = ({ onChange, name, values }) => {
    const classes = useStyles();
    return (
        <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={onChange(name)}
            margin="normal"
        />
    );
};
