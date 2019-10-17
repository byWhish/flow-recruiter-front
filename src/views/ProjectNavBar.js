import React, { useCallback, useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import styles from './ProjectNavBar.module.css';
import PropsRoute from '../components/router/PropsRoute';
import Project from './Project';
import NavLink from '../components/router/NavLink';
import Candidates from './Candidates';
import Mail from './Mail';
import DynForm from './DynForm';
import LoadingModal from '../components/uikit/LoadingModal';
import { ProjectService } from '../Services/ProjectService';
import { DONE, LOADING, UNLOAD } from '../context/config';

const emptyProject = {};

const ProjectNavBar = ({ match }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [project, setProject] = useState(emptyProject);
    const [loading, setLoading] = useState(UNLOAD);
    const { params: { recruitmentId } } = match;

    const handleUpdateProject = useCallback((newProject) => {
        setProject(newProject);
    }, []);

    const fetchProject = useCallback(() => {
        setLoading(LOADING);
        ProjectService.getProject(recruitmentId)
            .then((response) => {
                setLoading(DONE);
                setProject(response);
            });
    }, [recruitmentId]);

    useEffect(() => {
        if (recruitmentId) fetchProject();
    }, [fetchProject, recruitmentId]);

    return (
        <div className={styles.navBar}>
            <MemoryRouter>
                <div className={styles.nabTabs}>
                    <NavLink enabled tab={{ to: '/', label: 'Proyecto' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.id} tab={{ to: `/dynamicForm/${project.id}`, label: 'Formulario' }} index={1} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasForm} tab={{ to: `/mail/${project.id}/form`, label: 'Mail formulario' }} index={2} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasFormMail} tab={{ to: `/candidates/${project.id}/invite`, label: 'Candidatos' }} index={3} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasResponses} tab={{ to: `/mail/${project.id}/invite`, label: 'Mail invitacion' }} index={4} onActive={setActiveTab} active={activeTab} />
                </div>
                <Switch>
                    <PropsRoute exact path="/" component={Project} onUpdateProject={handleUpdateProject} setLoading={setLoading} />
                    <PropsRoute exact path="/candidates/:recruitmentId/:type" component={Candidates} onUpdateProject={handleUpdateProject} setLoading={setLoading} />
                    <PropsRoute exact path="/mail/:recruitmentId/:type" component={Mail} onUpdateProject={handleUpdateProject} setLoading={setLoading} />
                    <PropsRoute exact path="/dynamicForm/:recruitmentId" component={DynForm} onUpdateProject={handleUpdateProject} setLoading={setLoading} />
                </Switch>
            </MemoryRouter>
            <LoadingModal state={loading} />
        </div>

    );
};

export default ProjectNavBar;
