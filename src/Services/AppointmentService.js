import axios from 'axios';
import { format } from 'date-fns';
import { config } from '../context/config';

const processAppointment = (appointment, filtered) => appointment.schedules
    .map((schedule, idx) => ({
        value: idx + 1,
        id: schedule.id,
        label: format(schedule.date, 'dd/MM/yyyy'),
        blocks: filtered ? schedule.blocks.filter(block => block.free) : schedule.blocks,
    }));

const fetchGuestConfirmPublic = (id, filtered = false) => {
    const endpoint = `${config.apiUrl}/api/private/appointment/${id}`;
    return axios.get(endpoint)
        .then(response => processAppointment(response.data, filtered));
};

const postSelectedBlock = (appointmentId, scheduleId, blockId) => {
    const endpoint = `${config.apiUrl}/api/private/appointment/completed/${appointmentId}/${scheduleId}/${blockId}`;
    return axios.post(endpoint);
};

export const AppointmentService = {
    fetchGuestConfirmPublic, postSelectedBlock,
};

export default { fetchGuestConfirmPublic, postSelectedBlock };
