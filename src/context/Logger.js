const Logger = {
    of: type => ({
        info: () => {},
        error: (...args) => {
            console.error(type, ' | ', ...args); // eslint-disable-line no-console
        },
        trace: (...args) => {
            console.log(type, ' | ', ...args); // eslint-disable-line no-console
        },
    }),
};

export default Logger;
