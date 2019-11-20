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
                    <Route path={root} component={Sidebar} />
                    <Switch>
                        <PrivateRoute exact path={root} component={Home} />
                        <PrivateRoute exact path={home} component={Home} />
                        <PrivateRoute exact path={createProject} component={ProjectNavBar} />
                        <PrivateRoute exact path={editProject} component={ProjectNavBar} />
                        <PrivateRoute exact path={allProjects} component={ProjectList} />
                        <PrivateRoute exact path={allCandidates} component={CandidatesList} />
                        <Redirect to={error404} />
                    </Switch>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
