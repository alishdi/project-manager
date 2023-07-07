

const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");

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

    async inviteUserToTeam(req, res, next) {
        try {
            const userID = req.user._id;
            const { username, teamID } = req.params;
            const team = await teamModel.findOne({
                $or: [
                    { owner: userID },
                    { users: userID }
                ],
                _id: teamID
            })
            if (!team) throw { status: 400, message: "تیمی جهت دعوت کردن یافت نشد" }
            const user = await userModel.find({ username })
            if (!user) throw { status: 400, message: 'کاربر مورد نظر جهت دعوت به تیم یافت نشد' };
            const usernvited = await teamModel.findOne({
                $or: [
                    { owner: user[0]._id },
                    { users: user[0]._id }
                ],
                _id: teamID
            })
           
            if (usernvited) throw { status: 400, message: 'کاربر مورد نظر به تیم دعوت شده است' }
            const request = {
                caller: req.user.username,
                requestDate: new Date(),
                teamID,
                status: "pending"
            }
            const updateUserResult = await userModel.updateOne({ username }, {
             
                $push: { inviteRequests: request }
            })
            if (updateUserResult.modifiedCount == 0) throw { status: 500, message: 'درخواست دعوت ثبت نشد' }
            return res.status(200).json({
                status: 200,
                message: 'ثبت درخواست با موفقیت ایجاد شد',
                success: true
            })
        } catch (error) {
            next(error)
        }
    }
    updateTeam() {

    }
    removeUserFromTeam() {

    }

}
module.exports = {
    TeamController: new TeamController()
}