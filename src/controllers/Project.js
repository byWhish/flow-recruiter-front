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

    get hasResponses() {
        return !!this.responses.length;
    }
}

export default Project;
