const { Router } = require('express');
const { checkLogin } = require('../http/middleware/athologin');
const { UserController } = require('../http/controller/user.controller');


const userRouter = Router()

userRouter.get('/profile',checkLogin,UserController.getProfile)

module.exports = {
    userRouter
}