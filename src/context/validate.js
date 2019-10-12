import { useReducer } from 'react';

const initialState = {};

const reducer = (state, action) => ({ ...state, ...action });

// for string and number
export const empty = value => ({ error: !value, message: 'Este campo no puede ser vacio' });

// for string
export const minLength = min => value => (typeof value === 'string' ? { error: value.length < min, message: `Minimo de ${min} caraacteres` } : { error: false });

const useValidate = (criteria) => {
    const [errors, dispatch] = useReducer(reducer, initialState);

    const validate = value => Object.keys(value).reduce((hasError, key) => {
        // apply validation criteria
        const valid = criteria.reduce((result, current) => result || current(value[key]), false);
        dispatch({ [key]: valid });
        return hasError || valid;
    }, false);

    return [errors, validate];
};

export default useValidate;
