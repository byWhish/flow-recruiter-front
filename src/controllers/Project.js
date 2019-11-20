class Project {
    responses = [];

    static build(project) {
        return Object.assign(new Project(), project);
    }

    get hasForm() {
        return !!this.form;
    }

    get hasFormMail() {
        return !!this.formMail;
    }

    get hasInvitationMail() {
        return !!this.invitationMail;
    }

    get hasSchedules() {
        return this.schedules.length;
    }

    get hasInterested() {
        return this.invitations.find(invitation => invitation.completed);
    }

    get interested() {
        return this.invitations.filter(invitation => invitation.completed).length;
    }

    get formVisited() {
        return this.invitations.filter(invitation => invitation.visited).length;
    }

    get confirmed() {
        return this.appointments.filter(appointment => appointment.confirmed).length;
    }

    get calendarVisited() {
        return this.appointments.filter(appointment => appointment.visited).length;
    }
}

export default Project;
