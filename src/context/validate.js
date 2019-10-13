import { useReducer } from 'react';
import { isAfter, isBefore, format } from 'date-fns';

const initialState = {};

const reducer = (state, action) => ({ ...state, ...action });

// for string and number
export const empty = value => (!value ? { invalid: true, message: 'Valor no valido' } : null);

// for string
export const minStrLength = min => value => (typeof value === 'string' && value.length < min ? { invalid: true, message: `Minimo de ${min} caracteres` } : null);

// for array
export const minArrayLength = min => value => (value instanceof Array && value.length < min ? { invalid: true, message: `Minimo de elementos: ${min}` } : null);

// for dates
export const minDate = min => value => (value instanceof Date && !isAfter(value, min) ? { invalid: true, message: `Fecha superior a ${format(min, 'dd/mm/yy')}` } : null);

export const maxDate = max => value => (value instanceof Date && !isBefore(value, max) ? { invalid: true, message: `Fecha inferior a ${format(max, 'dd/mm/yy')}` } : null);

const useValidate = (criteria) => {
    const [errors, dispatch] = useReducer(reducer, initialState);

    const validate = value => Object.keys(value).reduce((noError, key) => {
        // apply validation criteria
        const validation = criteria.reduce((result, current) => (current(value[key]) ? current(value[key]) : result), { invalid: false });
        dispatch({ [key]: validation });
        return noError && !validation.invalid;
    }, true);

    return [errors, validate];
};

export default useValidate;
