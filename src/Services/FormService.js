import axios from 'axios';
import Logger from '../context/Logger';

const postForm = ({ form, recruitmentId }) => {
    const endpoint = `http://localhost:8080/api/private/project/form/${recruitmentId}`;

    const data = form;

    return axios.post(endpoint, data)
        .then((response) => {
            Logger.of('FormService.postForm').trace('response:', response);
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
