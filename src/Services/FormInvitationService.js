import axios from 'axios';
import Logger from '../context/Logger';

const inviteCandidates = (candidates, recruitmentId = 15) => {
    const endpoint = `http://localhost:8080/api/private/mail/${recruitmentId}/invite`;

    const data = candidates;

    return axios.post(endpoint, data)
        .then(response => response.data)
        .catch(error => Logger.of('inviteCandidates').error('error:', error));
};

const sendForm = (id) => {
    const endpoint = 'http://localhost:8080/api/private/form/completed';

    const data = {
        id,
    };

    return axios.post(endpoint, data)
        .then(response => response.data)
        .catch(error => Logger.of('sendForm').error('error:', error));
};

export const FormInvitationService = {
    sendForm, inviteCandidates,
};

export default {
    sendForm, inviteCandidates,
};
