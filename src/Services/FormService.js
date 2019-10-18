import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';
import Project from '../controllers/Project';

const postForm = ({ form, recruitmentId }) => {
    const endpoint = `${config.apiUrl}/api/private/project/form/${recruitmentId}`;

    const data = form;

    return axios.post(endpoint, data)
        .then((response) => {
            Logger.of('FormService.postForm').trace('response:', response.data);
            return Project.build(response.data);
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
