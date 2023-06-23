
const { userModel } = require("../../models/user")
const { hashPassword } = require("../../utils/hashPassword")
const bcrypt = require('bcrypt');
const { tokenGenerator } = require("../../utils/jwt");
class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email, mobile } = req.body
            const hashPass = hashPassword(password)
            const user = await userModel.create({
                username, email, password: hashPass, mobile
            }).catch(err => {
                throw { status: 400, message: 'نام کاربری در سامانه موجود میباشد' }

            })
            res.send(user)

        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await userModel.findOne({ username })
            if (!user) throw { status: 401, message: 'نام کاربری یا رمز عبور صحیح نمیباشد' }
            const compairResult=bcrypt.compareSync(password, user.password);
            if(!compairResult) throw {status:401,message:'نام کاربری یا رمز عبور اشتباه میباشد'}
           const token=tokenGenerator({username})
           user.token=token
           await user.save()
            return res.status(200).json({
                status:200,
                success:true,
                message:'شما با موفقیت لاگین شدید',
                token
            })
        } catch (error) {
            next(error)
        }
    }

    restePassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}