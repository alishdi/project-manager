const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");
const { createLinks } = require("../../utils/createPath");

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user

            user.profile_image = createLinks(user.profile_image, req)
            return res.status(200).json({
                status: 200,
                succes: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }

    async editProfile(req, res, next) {
        try {
            const userID = req.user._id
            const data = { ...req.body }
            let fields = ['first_name', 'last_name', 'skills'];
            let badValues = ['', ' ', null, undefined, 0, -1, NaN, [], {}];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key]
                if (badValues.includes(value)) delete data[key]
            })

            const result = await userModel.updateOne({ _id: userID }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'به روز رسانی پروفایل با موفقیت ایجاد شد'
                })
            }
            throw { status: 400, message: 'به روز رسانی انجام نشد' }
        } catch (error) {
            next(error)
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            console.log(req.body);
            const userId = req.user._id
            const filePath = req.file?.path?.substring(7)
            const result = await userModel.updateOne({ _id: userId }, { $set: { profile_image: filePath } })
            if (result.modifiedCount == 0) throw { status: 400, message: 'به روز رسانی انجام نشد' }


            return res.status(200).json({ status: 200, success: true, message: 'به روز رسانی با موفقیت انجام شد' })

        } catch (error) {
            next(error)
        }
    }
    async getAllRequests(req, res, next) {
        try {
            const userID = req.user._id
            const inviteRequests  = await userModel.aggregate([
                {
                    $match:{
                        _id:userID
                    }
                },
                {
                    $project: { inviteRequests: 1 }
                },
                {
                    $lookup:{
                        from:'users',
                        localField:"inviteRequests.caller",
                        foreignField:'username',
                        as:"inviteRequests.caller"
                    }
                }
            ])
            return res.json({
                request: inviteRequests
            })
        } catch (error) {
            next(error)
        }

    }
    async getrequestsByStatus(req, res, next) {
        try {
            const { status } = req.params;
            console.log(status);
            const userId = req.user._id;
            const requests = await userModel.aggregate([
                {
                    $match: { _id: userId },
                },
                {
                    $project: {
                        inviteRequests: 1,
                        _id: 0,
                        inviteRequests: {
                            $filter: {
                                input: "$inviteRequests",
                                as: "request",
                                cond: {
                                    $eq: ["$$request.status", status]
                                }
                            }
                        }
                    }
                }


            ])
            return res.status(200).json({
                status: 200,
                success: true,
                requests
            })
        } catch (error) {
            next(error)
        }

    }

    async changeStatus(req, res, next) {
        try {
            const { id, status } = req.params;
            const request = await userModel.findOne({ "inviteRequests._id": id })
            if (!request) throw { status: 404, message: 'درخواستی با این مشخصات وجود نداشت' }
            const findRequest = request.inviteRequests.find(item => item.id == id)
            if (findRequest.status !== "pending") throw { status: 400, message: 'این درخواست قبلا پذیرفته یا رد شده است' }
            if (!["accepted", "rejected"].includes(status)) throw { status: 400, message: 'اطلاعات ارسال شده صحیح نمیباشد' }

            const updateResult = await userModel.updateOne({ "inviteRequests._id": id }, {
                $set: {
                    "inviteRequests.$.status": status
                }
            })
            if (updateResult.modifiedCount == 0) throw { status: 500, message: "تغییر وضعیت درخواست انجام نشد" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'تغییر وضعیت درخواست با موفقیت انجام شد'
            })

        } catch (error) {
            next(error)
        }
    }

   
    addSkills() {

    }

    editSkills() {

    }

    acceptInviteTeam() {

    }
    rejectInviteTeam() {

    }
}

module.exports = {
    UserController: new UserController()
}