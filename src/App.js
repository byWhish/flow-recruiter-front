import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import Home from './views/Home';
import Error404 from './views/Error404';
import ProjectNavBar from './views/ProjectNavBar';
import ProjectList from './views/ProjectList';
import Sidebar from './components/menu/SideBar';
import Form from './views/Form';
import Calendar from "./views/Calendar";

const App = () => (
    <div className="App">
        <Switch>
            <Route exact path="/404" component={Error404} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/confirm" component={Calendar} />
            <Route path="/">
                <Route path="/" component={Sidebar} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/projects/create" component={ProjectNavBar} />
                    <Route exact path="/projects/edit/:recruitmentId" component={ProjectNavBar} />
                    <Route exact path="/projects/all" component={ProjectList} />
                    <Redirect to="/404" />
                </Switch>
            </Route>
        </Switch>
    </div>
);

export default App;
