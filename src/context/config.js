export const config = {
    apiUrl: process.env.REACT_APP_API_URL,
};

export const URLS = {
    root: '/',
    candidates: '/candidates/:recruitmentId/:type',
    interested: '/interested/:recruitmentId/:type',
    mails: '/mail/:recruitmentId/:type',
    dynForm: '/dynamicForm/:recruitmentId',
    calendar: '/calendar/:recruitmentId',
};

export const LOADING = 'loading';
export const DONE = 'done';
export const UNLOAD = 'unload';
export const ERROR = 'error';
