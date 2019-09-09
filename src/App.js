import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';

const App = () => (
    <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </div>
);

export default App;
