import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';
import Project from '../controllers/Project';

const processProjects = projects => projects.map(item => Project.build(item));

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
        .then(response => Project.build(response.data))
        .catch(error => Logger.of('getProyect').error(error));
};

const getProjects = () => {
    const endpoint = `${config.apiUrl}/api/private/project/all`;

    return axios.get(endpoint)
        .then(response => processProjects(response.data))
        .catch(error => Logger.of('getProyects').error(error));
};

const saveMail = (data, recruitmentId, type) => {
    const endpoint = `${config.apiUrl}/api/private/project/mail/${recruitmentId}/${type}`;

    return axios.post(endpoint, data)
        .then(response => Project.build(response.data))
        .catch(error => Logger.of(saveMail).error(error));
};

const removeProject = (recruitmentId) => {
    const endpoint = `${config.apiUrl}/api/private/project/delete/${recruitmentId}`;

    return axios.delete(endpoint)
        .then(response => processProjects(response.data))
        .catch(error => Logger.of('removeProject').error(error));
};

export const ProjectService = {
    postProject, getProjects, getProject, saveMail, removeProject,
};

export default {
    postProject, getProjects, getProject, saveMail, removeProject,
};
