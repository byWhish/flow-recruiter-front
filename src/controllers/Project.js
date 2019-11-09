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

    get hasInterested() {
        return this.invitations.find(invitation => invitation.completed);
    }

    get interested() {
        return this.invitations.filter(invitation => invitation.completed).length;
    }
}

export default Project;
