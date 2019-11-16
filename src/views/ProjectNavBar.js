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
import { CandidateService } from '../Services/CandidateService';
import ProjectCalendar from "./ProjectCalendar";

const emptyProject = {
    name: '',
    description: '',
    schedules: [],
};

const ProjectNavBar = ({ match }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [project, setProject] = useState(emptyProject);
    const [loading, setLoading] = useState(UNLOAD);
    const { params: { recruitmentId } } = match;
    const [edit, setEdit] = useState(false);

    const handleUpdateProject = useCallback((newProject) => {
        setProject(newProject);
    }, []);

    const fetchProject = useCallback(() => {
        setLoading(LOADING);
        ProjectService.getProject(recruitmentId)
            .then((response) => {
                setEdit(true);
                setProject(response);
                setLoading(DONE);
            });
    }, [recruitmentId]);

    const fetchAllCandidates = useCallback(() => CandidateService.fetchCandidates(), []);

    const fetchAllInterested = useCallback(() => CandidateService.fetchInterested(recruitmentId), [recruitmentId]);


    useEffect(() => {
        if (recruitmentId) {
            fetchProject();
        } else {
            setEdit(false);
            setProject(emptyProject);
        }
    }, [fetchProject, recruitmentId]);

    return (
        <div className={styles.navBar}>
            <MemoryRouter>
                <div className={styles.nabTabs}>
                    <NavLink enabled tab={{ to: '/', label: 'Proyecto' }} index={0} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.id} tab={{ to: `/dynamicForm/${project.id}`, label: 'Formulario' }} index={1} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasForm} tab={{ to: `/mail/${project.id}/form`, label: 'Mail formulario' }} index={2} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasFormMail} tab={{ to: `/candidates/${project.id}/invite`, label: 'Candidatos' }} index={3} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasInterested} tab={{ to: `/mail/${project.id}/invite`, label: 'Mail invitacion' }} index={4} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasInvitationMail} tab={{ to: `/interested/${project.id}/summon`, label: 'Interesados' }} index={5} onActive={setActiveTab} active={activeTab} />
                    <NavLink enabled={project.hasInvitationMail} tab={{ to: `/calendar/${project.id}`, label: 'Calendario' }} index={6} onActive={setActiveTab} active={activeTab} />
                </div>
                <Switch>
                    <PropsRoute exact path="/" component={Project} onUpdateProject={handleUpdateProject} setLoading={setLoading} edit={edit} project={project} />
                    <PropsRoute exact path="/candidates/:recruitmentId/:type" component={Candidates} fetchCandidates={fetchAllCandidates} onUpdateProject={handleUpdateProject} setLoading={setLoading} edit={edit} />
                    <PropsRoute exact path="/interested/:recruitmentId/:type" component={Candidates} fetchCandidates={fetchAllInterested} onUpdateProject={handleUpdateProject} setLoading={setLoading} edit={edit} />
                    <PropsRoute exact path="/mail/:recruitmentId/:type" component={Mail} onUpdateProject={handleUpdateProject} setLoading={setLoading} edit={edit} project={project} />
                    <PropsRoute exact path="/dynamicForm/:recruitmentId" component={DynForm} onUpdateProject={handleUpdateProject} setLoading={setLoading} edit={edit} project={project} />
                    <PropsRoute exact path="/calendar/:recruitmentId" component={ProjectCalendar} onUpdateProject={handleUpdateProject} setLoading={setLoading} edit={edit} project={project} />
                </Switch>
            </MemoryRouter>
            <LoadingModal state={loading} />
        </div>

    );
};

export default ProjectNavBar;
