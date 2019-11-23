export const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    authCallbackUri: process.env.REACT_APP_AUTH_CALLBACK_URI,
};

export const URLS = {
    root: '/',
    auth: '/auth',
    login: '/login',
    home: '/home',
    candidates: '/candidates/:recruitmentId/:type',
    interested: '/interested/:recruitmentId/:type',
    mails: '/mail/:recruitmentId/:type',
    dynForm: '/dynamicForm/:recruitmentId',
    calendar: '/calendar/:recruitmentId',
    createProject: '/projects/create',
    editProject: '/projects/edit/:recruitmentId',
    allProjects: '/projects/all',
    allCandidates: '/candidates/all',
    error404: '/404',
    form: '/form',
    confirm: '/confirm',
    thanks: '/thanks',
};

export const LOADING = 'loading';
export const DONE = 'done';
export const UNLOAD = 'unload';
export const CONFIRMED = 'confirmed';
export const ERROR = 'error';
