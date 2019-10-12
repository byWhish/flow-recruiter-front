import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Home from './views/Home';
import Error404 from './views/Error404';
import ProjectNavBar from './views/ProjectNavBar';
import ProjectList from './views/ProjectList';
import Sidebar from './components/menu/SideBar';
import Form from './views/Form';

const App = () => (
    <div className="App">
        <Sidebar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects/create" component={ProjectNavBar} />
            <Route exact path="/projects/edit/:recruitmentId" component={ProjectNavBar} />
            <Route exact path="/projects/all" component={ProjectList} />
            <Route exact path="/form" component={Form} />
            <Route component={Error404} />
        </Switch>
    </div>
);

export default App;
