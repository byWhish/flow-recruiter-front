import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';

const fetchCandidates = () => {
    const endpoint = `${config.apiUrl}/api/private/candidate/all`;
    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('fetchCandidates').error('error:', error));
};

const fetchInterested = (recruitmentId) => {
    const endpoint = `${config.apiUrl}/api/private/project/interested/${recruitmentId}`;
    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('fetchCandidates').error('error:', error));
}

const fetchAnswers = () => {
    const endpoint = `${config.apiUrl}/api/private/form/answer/all`;
    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('fetchAnswers').error('error:', error));
};


export const CandidateService = {
    fetchCandidates, fetchAnswers, fetchInterested,
};

export default {
    fetchCandidates, fetchAnswers, fetchInterested,
};
