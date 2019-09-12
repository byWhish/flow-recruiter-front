import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';
import DynForm from './views/DynForm';
import Confirm from './views/Confirm';
import Candidates from './views/Candidates';
import Error404 from './views/Error404';

const App = () => (
    <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/form" component={DynForm} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/candidates" component={Candidates} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default App;
