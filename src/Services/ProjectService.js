import axios from 'axios';

const postProject = ({ project, schedulesList }) => {
    const endpoint = 'http://localhost:8080/api/private/project/add';
    const data = {
        ...project,
        schedules: schedulesList,
    };

    return axios.post(endpoint, data)
        .then(((response) => {
            console.log(response.data);
        }))
        .catch(error => console.log(error));
};

const getProjects = () => {
    const endpoint = 'http://localhost:8080/api/private/project/all';

    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => console.log(error));
};

export const ProjectService = {
    postProject, getProjects,
};

export default {
    postProject, getProjects,
};
