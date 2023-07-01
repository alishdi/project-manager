
const { ProjectModel } = require("../../models/project");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, tags } = req.body;
            console.log(tags);
            const image = req?.file?.path?.substring(7)
            console.log(image);
            const owner = req.user._id

            const result = await ProjectModel.create({ title, text, owner, image, tags });
            if (!result) throw { status: 400, message: 'افزودن پروژه با مشکل مواجه شد' }


            return res.status(201).json({
                status: 201,
                success: true,
                message: 'پروژه با موفقیت انجام شد'
            })

        } catch (error) {

            next(error)
        }
    }

    async getAllProject(req, res, next) {
        try {
            const owner = req.user._id;

            const project = await ProjectModel.find({ owner })
            console.log(project);
            return res.status(200).json({
                status: 200,
                success: true,
                project
            })
        } catch (error) {
            next(error)
        }
    }
    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id
            const project = await ProjectModel.findOne({ owner, _id: projectID })
            if (!project) throw { status: 404, message: 'پروژه ای یافت نشد' }

            return res.status(200).json({
                status: 200,
                success: true,
                project
            })
        } catch (error) {
            next(error)
        }

    }
    async removeProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id
            const project = await ProjectModel.findOneAndDelete({ owner, _id: projectID })
            if (project.deletedCount == 0) throw { status: 400, message: 'پروژه حذف نشد' }

            return res.status(200).json({
                status: 200,
                success: true,
                message: 'پروژه با موفقیت حذف شد'
            })
        } catch (error) {
            next(error)
        }
    }


    getAllProjectOfTeam() {

    }
    getProjectOfUser() {

    }
    updateProject() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}