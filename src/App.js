import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';
import DynForm from './views/DynForm';
import Confirm from './views/Confirm';
import Candidates from './views/Candidates';
import Error404 from './views/Error404';
import Form from './views/Form';
import Answers from './views/Answers';
import Project from "./views/Project";

const App = () => (
    <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/candidates" component={Candidates} />
            <Route exact path="/answers" component={Answers} />
            <Route exact path="/projects" component={Project} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default App;
