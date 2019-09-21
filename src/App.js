import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';
import Confirm from './views/Confirm';
import Candidates from './views/Candidates';
import Error404 from './views/Error404';
import Form from './views/Form';
import Answers from './views/Answers';
import Project from './views/Project';
import ProjectList from './views/ProjectList';
import Mail from './views/Mail';
import DynForm from './views/DynForm';

const App = () => (
    <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/candidates" component={Candidates} />
            <Route exact path="/answers" component={Answers} />
            <Route exact path="/projects/create" component={Project} />
            <Route exact path="/projects" component={ProjectList} />
            <Route exact path="/mails/:type" component={Mail} />
            <Route exact path="/dynform" component={DynForm} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default App;
