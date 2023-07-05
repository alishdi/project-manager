
const { ProjectModel } = require("../../models/project");
const { createLinks } = require("../../utils/createPath");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, tags } = req.body;

            const image = req?.file?.path?.substring(7)

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

            const projects= await ProjectModel.find({ owner })
            for(const project of projects) {
                project.image=createLinks(project.image,req)
            }
            return res.status(200).json({
                status: 200,
                success: true,
                projects
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
            project.image=createLinks(project.image,req)
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


    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const data = { ...req.body }
            Object.entries(data).forEach(([key, value]) => {
                if (!['title', 'text', 'tags'].includes(key)) delete data[key]
                if (["", " ", null, undefined, NaN].includes(value)) delete data[key]
                if (key == "tags" && (data['tags'].constructor === Array)) {
                    data['tags'] = data['tags'].filter(val => {
                        if (!["", " ", null, undefined, NaN].includes(val)) return val
                    })
                    if (data['tags'].length == 0) delete data['tags']
                }
            })
            const updateResult = await ProjectModel.findOneAndUpdate({ owner, _id: projectID }, { $set: data })
            if (updateResult.modifiedCount == 0) throw { status: 400, message: 'به روز رسانی انجام نشد' }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'به روزرسانی با موفقیت انجام شد'
            })
        } catch (error) {
            next(error)
        }
    }

    async updateProjectImage(req, res, next) {
        try {

            const image = req?.file?.path?.substring(7)
            const owner = req.user._id
            const projectID = req.params.id
            console.log(image, owner, projectID);
            const updateResult = await ProjectModel.findOneAndUpdate({ owner, _id: projectID }, { $set: { image } })
            console.log(updateResult);
            if (updateResult.modifiedCount == 0) throw { status: 400, message: 'به روز رسانی انجام نشد' }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'به روزرسانی با موفقیت انجام شد'
            })

        } catch (error) {

            next(error)
        }
    }
    getAllProjectOfTeam() {

    }
    getProjectOfUser() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}