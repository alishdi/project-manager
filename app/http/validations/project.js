const { body } = require("express-validator");
const path = require('path');

function projectValidator() {
    return [
        body('title').notEmpty().withMessage('عنوان پروژه نمیتواند خالی باشد'),
        body('text').notEmpty().isLength({ min: 20 }).withMessage('توضیحات پروژه نمیتواند خالی باشد و حداقل باید 25 کاراکتر باشد'),
        body('image').custom((image, { req }) => {

            if (Object.keys(req.file).length == 0) throw "لطفا یک تصویر را انتخاب کنید"
            const ext = path.extname(req.file.originalname)
            const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.ico']
            if (!exts.includes(ext)) throw 'فرمت عکس صحیح نیست'
            const maxSize = 2 * 1024 * 1024
            if (req.file.size > maxSize) throw 'حجم فایل نمیتواند بیشتر از 2 مگابایت باشد'
            return true
        }),
        body('tags').isArray({ min: 0, max: 10 }).withMessage('حداکثر 10 هشتک مجاز است')

    ]


}

module.exports = {
    projectValidator
}