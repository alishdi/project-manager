const { Router } = require('express');
const { ProjectController } = require('../http/controller/project.controller');
const { projectValidator } = require('../http/validations/project');
const {expressValidatorMapper}=require('./../http/middleware/errhandler');


const projectRouter = Router()
projectRouter.post('/create',projectValidator(),expressValidatorMapper,ProjectController.createProject)


module.exports={
    projectRouter
}