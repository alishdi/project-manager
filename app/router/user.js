const { Router } = require('express');
const { checkLogin } = require('../http/middleware/athologin');
const { UserController } = require('../http/controller/user.controller');
const { uploadMulter } = require('../utils/multer');
const { imageValidator } = require('../http/validations/user');
const { expressValidatorMapper } = require('../http/middleware/errhandler');


const userRouter = Router()

userRouter.get('/profile',checkLogin,UserController.getProfile)
userRouter.post('/edit-profile',checkLogin,UserController.editProfile)
userRouter.post('/profile-image',uploadMulter.single('image'),checkLogin,imageValidator(),expressValidatorMapper,UserController.uploadProfileImage)

userRouter.get('/requests',checkLogin,UserController.getAllRequests)
module.exports = {
    userRouter
}