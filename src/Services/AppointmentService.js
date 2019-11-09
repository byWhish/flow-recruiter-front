import axios from 'axios';
import { format } from 'date-fns';
import { config } from '../context/config';

const processAppointment = (appointment => appointment.schedules
    .map((schedule, idx) => ({
        value: idx,
        id: schedule.id,
        label: format(schedule.date, 'dd/MM/yyyy'),
        blocks: schedule.blocks.filter(block => block.free),
    })));

const fetchGuestConfirmPublic = (id) => {
    const endpoint = `${config.apiUrl}/api/private/appointment/${id}`;
    return axios.get(endpoint)
        .then(response => processAppointment(response.data));
};

const postSelectedBlock = (appointmentId, scheduleId,blockId) => {
    const endpoint = `${config.apiUrl}/api/private/appointment/completed/${appointmentId}/${scheduleId}/${blockId}`;
    return axios.post(endpoint);
};

export const AppointmentService = {
    fetchGuestConfirmPublic, postSelectedBlock,
};

export default { fetchGuestConfirmPublic, postSelectedBlock };
