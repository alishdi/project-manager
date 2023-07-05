const { userModel } = require("../../models/user");
const { createLinks } = require("../../utils/createPath");

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user
            console.log(req.user);
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
            console.log(data);
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