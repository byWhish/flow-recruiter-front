import { createBrowserHistory } from 'history';

export const clearHistoryState = (history) => {
    if (history.location.state) {
        history.replace({ ...history.location, state: null });
    }
};

export default createBrowserHistory();
