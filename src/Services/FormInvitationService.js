import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';
import Project from '../controllers/Project';

const inviteCandidates = (candidates, recruitmentId, type) => {
    const endpoint = `${config.apiUrl}/api/private/mail/${recruitmentId}/${type}`;

    const data = candidates;

    return axios.post(endpoint, data)
        .then(response => response.data)
        .catch(error => Logger.of('inviteCandidates').error('error:', error));
};

const sendForm = (questions, form) => {
    const endpoint = `${config.apiUrl}/api/private/form/completed`;

    const data = {
        id: form.id,
        idLink: form.formLink,
        // questions: questions.map(item => (item.options ? { ...item, type: 'multi' } : { ...item, type: 'single' })),
        questions: questions.map(item => ({ question: item.label, response: item.response, id: item.id })),
    };

    return axios.post(endpoint, data)
        .then(response => response.data)
        .catch(error => Logger.of('sendForm').error('error:', error));
};

const getForm = (id) => {
    const endpoint = `${config.apiUrl}/api/private/form/${id}`;

    return axios.get(endpoint)
        .then(response => response.data);
};

export const FormInvitationService = {
    sendForm, inviteCandidates, getForm,
};

export default {
    sendForm, inviteCandidates, getForm,
};
