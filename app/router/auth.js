const {AuthController}=require('../http/controller/auth.controller');
const { Router } = require('express');
const { registerValidator } = require('../http/validations/auth');
const { expressValidatorMapper } = require('../http/middleware/errhandler');

const authRouter = Router()

authRouter.post('/register',registerValidator(),expressValidatorMapper,AuthController.register)

module.exports={
    authRouter
}