import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';
import Project from '../controllers/Project';

const inviteCandidates = (candidates, recruitmentId, type) => {
    const endpoint = `${config.apiUrl}/api/private/mail/${recruitmentId}/${type}`;

    const data = candidates;

    return axios.post(endpoint, data)
        .then(response => Project.build(response.data))
        .catch(error => Logger.of('inviteCandidates').error('error:', error));
};

const sendForm = (questions, idLink, recruitmentId) => {
    const endpoint = `${config.apiUrl}/api/private/form/completed`;

    const data = {
        idLink,
        questions: questions.map(item => ({ response: item.response, question: item.label })),
        recruitmentId,
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
