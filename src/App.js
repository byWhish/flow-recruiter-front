import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';
import Error404 from './views/Error404';
import ProjectNavBar from './views/ProjectNavBar';

const App = () => (
    <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects/create" component={ProjectNavBar} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default App;
