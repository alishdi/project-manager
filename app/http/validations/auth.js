const { body } = require('express-validator');
const { userModel } = require('../../models/user');
function registerValidator() {
    return [
        body('username').custom(async (value, ctx) => {
            if (value) {
                const checkUserName = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
                if (checkUserName.test(value)) {
                    const user = await userModel.findOne({ username: value })
                    if (user) throw 'نام کاربری تکراری میباشد'
                    return true
                }
                throw 'نام کاربری صحیح نمیباشد'
            }
            throw 'نام کاربری نمیتواند خالی باشد'
        }),
        body('email').isEmail().withMessage('ایمیل وارد شده صحیح نمیباشد').custom(async (email) => {
            const user = await userModel.findOne({ email })
            if (user) throw 'ایمیل وارد شده از قبل استفاد شده است'
        }),
        body('mobile').isMobilePhone('fa-IR').withMessage('شماره موبایل وارد شده صحیح نمیباشد').custom(async (mobile) => {
            const user = await userModel.findOne({ mobile })
            if (user) throw 'شماره موبایل وارد شده از قبل استفاد شده است'
        }),
        body('password').isLength({ min: 6, max: 16 }).withMessage('رمز عبور حداقل 6 و حداقل 16 کاراکتر باشد').custom((value, ctx) => {
            if (!value) throw "رمز عبور خالی نمیتواند باشد"
            if (value !== ctx?.req?.body?.confirm_password) throw 'رمز عبور با تکرار آن یکسان نمیباشد'
            return true
        })

    ]
}


module.exports = {
    registerValidator
}