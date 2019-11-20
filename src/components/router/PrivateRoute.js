import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../../Services/Auth';
import { URLS } from '../../context/config';

const renderRouter = (component, ...rest) => {
    const props = Object.assign({}, ...rest);
    return React.createElement(component, props);
};

const PrivateRoute = ({ component, ...rest }) => {
    if (!Auth.isLoggedIn()) return <Redirect to={{ pathname: URLS.login }} />;

    return (
        <Route
            {...rest}
            render={props => renderRouter(component, props, rest)}
        />
    );
};

export default PrivateRoute;
