const { body } = require("express-validator");

function projectValidator() {
    return [
        body('title').notEmpty().withMessage('عنوان پروژه نمیتواند خالی باشد'),
        body('text').notEmpty().isLength({ min: 20}).withMessage('توضیحات پروژه نمیتواند خالی باشد و حداقل باید 25 کاراکتر باشد'),
    ]

    
}