const {AuthController}=require('../http/controller/auth.controller');
const { Router } = require('express');
const { registerValidator,loginvalidator } = require('../http/validations/auth');
const { expressValidatorMapper } = require('../http/middleware/errhandler');

const authRouter = Router()

authRouter.post('/register',registerValidator(),expressValidatorMapper,AuthController.register)
authRouter.post('/login',loginvalidator(),expressValidatorMapper,AuthController.login)

module.exports={
    authRouter
}