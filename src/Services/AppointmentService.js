import axios from 'axios';
import { config } from '../context/config';

const fetchGuestConfirmPublic = (id) => {
    const endpoint = `${config.apiUrl}/api/private/appointment/confirm`;
    const data = {
        id,
    };
    return axios.post(endpoint, data)
        .then(response => response.data);
};

export const AppointmentService = {
    fetchGuestConfirmPublic,
};

export default { fetchGuestConfirmPublic };
