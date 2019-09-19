import axios from 'axios';
import Logger from '../context/Logger';

const fetchCandidates = () => {
    const endpoint = 'http://localhost:8080/api/private/candidate/all';
    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('fetchCandidates').error('error:', error));
};

const fetchAnswers = () => {
    const endpoint = 'http://localhost:8080/api/private/form/answer/all';
    return axios.get(endpoint)
        .then(response => response.data)
        .catch(error => Logger.of('fetchAnswers').error('error:', error));
};


export const CandidateService = {
    fetchCandidates, fetchAnswers,
};

export default {
    fetchCandidates, fetchAnswers,
};
