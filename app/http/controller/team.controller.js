const e = require("express");
const { teamModel } = require("../../models/team");

class TeamController {
    async createTeam(req, res, next) {
        try {
            const { name, description, username } = req.body;
            const owner = req.user._id
            const team = await teamModel.create({
                name,
                username,
                description,
                owner
            })
            if (!team) throw { status: 500, message: 'افزودن تیم با خطا مواجه شد' }

            return res.status(201).json({
                status: 201,
                success: true,
                message: 'افزودن تیم با موفقیت انجام شد',
                team
            })
        } catch (error) {
            next(error)
        }

    }
    async getListOfTeam(req, res, next) {
        try {
            const teams = await teamModel.find({});
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async getTeamByID(req, res, next) {
        try {
            const teamId = req.params.id;
            const team = await teamModel.findById(teamId)
            if (!team) throw { status: 404, message: 'تیمی یافت نشد' }
            return res.status(200).json({
                status: 200,
                success: true,
                team
            })


        } catch (error) {
            next(error)
        }
    }
    async getMyTeams(req, res, next) {
        try {
            const userId = req.user._id
            const teams = await teamModel.find({
                $or: [
                    { owner: userId },
                    { users: userId }
                ]
            })
            return res.status(200).json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async removeTeamById(req, res, next) {
        try {
            const id = req.params.id
            const team = await teamModel.findById(id)
            if (!team) throw { status: 404, message: 'تیمی یافت نشد' }
            const result = await teamModel.deleteOne({ _id: id })
            if (result.deletedCount == 0) throw { status: 400, message: 'حذف تیم انجام نشد' }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "حذف تیم با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    inviteUserToTeam() {

    }
    updateTeam() {

    }
    removeUserFromTeam() {

    }

}
module.exports = {
    TeamController: new TeamController()
}