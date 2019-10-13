import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';

const postProject = ({ project, schedulesList }) => {
    const endpoint = `${config.apiUrl}/api/private/project/add`;
    const data = {
        ...project,
        schedules: schedulesList,
        timestamp: new Date(),
    };

    return axios.post(endpoint, data)
        .then(((response) => {
            Logger.of('postProject').trace(response.data);
            return response.data;
        }))
        .catch(error => Logger.of('postProject').error(error));
};

const getProject = (id) => {
    const endpoint = `${config.apiUrl}/api/private/project/${id}`;

    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('getProyect').error(error));
};

const getProjects = () => {
    const endpoint = `${config.apiUrl}/api/private/project/all`;

    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('getProyects').error(error));
};

const saveMail = (data, recruitmentId, type) => {
    const endpoint = `${config.apiUrl}/api/private/project/mail/${recruitmentId}/${type}`;

    return axios.post(endpoint, data)
        .then(response => response.data)
        .catch(error => Logger.of(saveMail).error(error));
};

export const ProjectService = {
    postProject, getProjects, getProject, saveMail,
};

export default {
    postProject, getProjects, getProject, saveMail,
};
