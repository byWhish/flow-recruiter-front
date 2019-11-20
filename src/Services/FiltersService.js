import axios from 'axios';
import Logger from '../context/Logger';
import { config } from '../context/config';

const fetchFilters = () => {
    const endpoint = `${config.apiUrl}/api/private/filters/all`;

    return axios.get(endpoint)
        .then((response) => {
            Logger.of('FiltersService.fetchFilters').trace('response:', response.data);
            return response.data;
        })
        .catch((error) => {
            Logger.of('FiltersService.fetchFilters').error(error);
        });
};

const fetchOptions = (filter) => {
    const endpoint = `${config.apiUrl}/api/private/filters/${filter}`;

    return axios.get(endpoint)
        .then((response) => {
            Logger.of('FiltersService.fetchOptions').trace('response:', response.data);
            return response.data;
        })
        .catch((error) => {
            Logger.of('FiltersService.fetchOptions').error(error);
        });
};

export const FiltersService = {
    fetchFilters, fetchOptions,
};

export default {
    fetchFilters, fetchOptions,
};
