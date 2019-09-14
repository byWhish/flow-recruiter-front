import axios from 'axios';

class AppointmentService {
    static fetchGuestConfirmPublic(id) {
        const endpoint = 'http://localhost:8080/api/private/appointment/confirm';
        const data = {
            id,
        };
        return axios.post(endpoint, data)
            .then(response => response.data);
    }
}

export default AppointmentService;
