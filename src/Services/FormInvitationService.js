import axios from 'axios';
import Logger from '../context/Logger';

class FormInvitationService {
    static inviteCandidates = (candidates) => {
        const endpoint = 'http://localhost:8080/api/private/mail/invite';

        const data = {
            recruitmentId: 1,
            candidates,
        };

        return axios.post(endpoint, data)
            .then(response => response.data)
            .catch(error => Logger.of('inviteCandidates').error('error:', error));
    }
}

export default FormInvitationService;
