import axios from 'axios';
import Logger from '../context/Logger';

const inviteCandidates = (candidates) => {
    const endpoint = 'http://localhost:8080/api/private/mail/invite';

    const data = {
        recruitmentId: 1,
        candidates,
    };

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
