class ProjectController {
    createProject(req, res, next) {
        try {
            const { title, ext } = req.body;
        } catch (error) {
            next(error)
        }
    }

    getAllProject() {

    }
    getProjectById() {

    }
    getAllProjectOfTeam() {

    }
    getProjectOfUser() {

    }
    updateProject() {

    }
    removeProject() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}