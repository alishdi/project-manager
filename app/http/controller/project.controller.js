const { projectModel } = require("../../models/project");

class ProjectController {
  async  createProject(req, res, next) {
        try {
            const { title, ext } = req.body;
            const result=await projectModel.create()

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