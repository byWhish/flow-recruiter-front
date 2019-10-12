import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';

const postForm = ({ form, recruitmentId }) => {
    const endpoint = `${config.apiUrl}/api/private/project/form/${recruitmentId}`;

    const data = form;

    return axios.post(endpoint, data)
        .then((response) => {
            Logger.of('FormService.postForm').trace('response:', response.data);
            return response.data;
        })
        .catch((error) => {
            Logger.of('FormService.postForm').error(error);
        });
};

export const FormService = {
    postForm,
};

export default {
    postForm,
};
