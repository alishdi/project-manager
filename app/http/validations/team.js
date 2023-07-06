const { body } = require("express-validator");
const { teamModel } = require("../../models/team");

function teamValidation() {
    return [
        body('name').notEmpty().isLength({ min: 5 }).withMessage("نام تیم نمیتواند کمتر از 5 نویسه باشد"),
        body('description').notEmpty().withMessage('توضیحات نمیتواند خالی باشد'),
        body('username').custom(async (username) => {
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if (usernameRegex.test(username)) {
                const team = await teamModel.findOne({ username });
                if (team) throw 'نام کاربری قبلا توسط تیم دیگری استفاده شده است'
                return true
            }
            throw 'نام کاربری را به طور صحیح وارد کنید'

        })
    ]
}
module.exports = {
    teamValidation
}