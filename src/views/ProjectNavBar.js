import React, { useState } from 'react';
import { MemoryRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import styles from './ProjectNavBar.module.css';
import PropsRoute from '../components/router/PropsRoute';
import Project from './Project';
import NavLink from '../components/router/NavLink';
import Candidates from './Candidates';
import Mail from './Mail';
import DynForm from './DynForm';


const ProjectNavBar = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className={styles.navBar}>
            <MemoryRouter>
                <div className={styles.nabTabs}>
                    <NavLink tab={{ to: '/', label: 'Proyecto' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink tab={{ to: '/candidates', label: 'Candidatos' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink tab={{ to: '/mail/form', label: 'Mail formulario' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink tab={{ to: '/dynamicForm', label: 'Formulario' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink tab={{ to: '/mail/invite', label: 'Mail invitacion' }} index={0} onActive={setActiveTab} active={activeTab} />
                </div>
                <Switch>
                    <PropsRoute exact path="/" component={Project} />
                    <PropsRoute exact path="/candidates" component={Candidates} />
                    <PropsRoute exact path="/mail/:type" component={Mail} />
                    <PropsRoute exact path="/dynamicForm" component={DynForm} />
                </Switch>
            </MemoryRouter>
        </div>

    );
};

export default ProjectNavBar;
