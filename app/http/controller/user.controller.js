class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user
            return res.status(200).json({
                status: 200,
                succes: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }

    editProfile() {

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