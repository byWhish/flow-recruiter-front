const Auth0 = (props) => {
    const { auth } = props;
    const handleAuthentication = (nextState) => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            auth.handleAuthentication();
        }
    };
    handleAuthentication(props);
    return null;
};

export default Auth0;
