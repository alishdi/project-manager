
const { userModel } = require("../../models/user")
const { hashPassword } = require("../../utils/hashPassword")

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email, mobile } = req.body
            const hashPass = hashPassword(password)
            const user = await userModel.create({
                username, email, password: hashPass, mobile
            }).catch(err => {
               throw {status:400,message:'نام کاربری در سامانه موجود میباشد'}
           
            })
            res.send(user)
            
        } catch (error) {
            next(error)
        }
    }
    login() {

    }

    restePassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}