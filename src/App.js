import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import Home from './views/Home';
import Error404 from './views/Error404';
import ProjectNavBar from './views/ProjectNavBar';
import ProjectList from './views/ProjectList';
import Sidebar from './components/menu/SideBar';
import Form from './views/Form';
import Calendar from './views/Calendar';
import CandidatesList from './views/CandidatesList';
import { URLS } from './context/config';
import Thanks from './views/Thanks';
import Auth0 from './views/Auth0';
import Auth from './Services/Auth';
import Login from './views/Login';
import PropsRoute from './components/router/PropsRoute';
import PrivateRoute from './components/router/PrivateRoute';

const App = () => {
    const auth0 = new Auth();
    const { root, form, confirm, error404, home, createProject, editProject, allProjects, allCandidates, thanks, auth, login } = URLS;

    return (
        <div className="App">
            <Switch>
                <PropsRoute exact path={login} component={Login} auth={auth0} />
                <PropsRoute exact path={auth} component={Auth0} auth={auth0} />
                <Route exact path={error404} component={Error404} />
                <Route exact path={form} component={Form} />
                <Route exact path={confirm} component={Calendar} />
                <Route exact path={thanks} component={Thanks} />
                <Route path={root}>
                    <PropsRoute path={root} component={Sidebar} auth={auth0} />
                    <Switch>
                        <PrivateRoute exact path={root} component={Home} auth={auth0} />
                        <PrivateRoute exact path={home} component={Home} auth={auth0} />
                        <PrivateRoute exact path={createProject} component={ProjectNavBar} auth={auth0} />
                        <PrivateRoute exact path={editProject} component={ProjectNavBar} auth={auth0} />
                        <PrivateRoute exact path={allProjects} component={ProjectList} auth={auth0} />
                        <PrivateRoute exact path={allCandidates} component={CandidatesList} auth={auth0} />
                        <Redirect to={error404} />
                    </Switch>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
