import React, { useCallback, useState } from 'react';
import { MemoryRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import styles from './ProjectNavBar.module.css';
import PropsRoute from '../components/router/PropsRoute';
import Project from './Project';
import NavLink from '../components/router/NavLink';
import Candidates from './Candidates';
import Mail from './Mail';
import DynForm from './DynForm';

const emptyProject = {};

const ProjectNavBar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [project, setProject] = useState(emptyProject);

    const handleUpdateProject = useCallback((newProject) => {
        setProject(newProject);
    }, []);

    return (
        <div className={styles.navBar}>
            <MemoryRouter>
                <div className={styles.nabTabs}>
                    <NavLink enabled tab={{ to: '/', label: 'Proyecto' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.id} tab={{ to: `/dynamicForm/${project.id}`, label: 'Formulario' }} index={1} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.form} tab={{ to: `/mail/${project.id}/form`, label: 'Mail formulario' }} index={2} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.formMail} tab={{ to: `/candidates/${project.id}`, label: 'Candidatos' }} index={3} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.responses} tab={{ to: `/mail/${project.id}/invite`, label: 'Mail invitacion' }} index={4} onActive={setActiveTab} active={activeTab} />
                </div>
                <Switch>
                    <PropsRoute exact path="/" component={Project} onUpdateProject={handleUpdateProject} />
                    <PropsRoute exact path="/candidates" component={Candidates} onUpdateProject={handleUpdateProject} />
                    <PropsRoute exact path="/mail/:recruitmentId/:type" component={Mail} onUpdateProject={handleUpdateProject} />
                    <PropsRoute exact path="/dynamicForm/:recruitmentId" component={DynForm} onUpdateProject={handleUpdateProject} />
                </Switch>
            </MemoryRouter>
        </div>

    );
};

export default ProjectNavBar;
