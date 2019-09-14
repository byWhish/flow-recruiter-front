import axios from 'axios';
import Logger from '../context/Logger';

class CandidateService {
    static fetchCandidates() {
        const endpoint = 'http://localhost:8080/api/private/candidate/all';
        return axios.get(endpoint)
            .then(response => response.data)
            .catch(error => Logger.of('fetchCandidates').error('error:', error));
    }

    static fetchAnswers() {
        const endpoint = 'http://localhost:8080/api/private/form/answer/all';
        return axios.get(endpoint)
            .then(response => response.data)
            .catch(error => Logger.of('fetchAnswers').error('error:', error));
    }
}

export default CandidateService;
