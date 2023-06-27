const { Router } = require('express');
const { ProjectController } = require('../http/controller/project.controller');
const { projectValidator } = require('../http/validations/project');

const { checkLogin } = require('./../http/middleware/athologin');
const { uploadMulter } = require('../utils/multer');
const { expressValidatorMapper } = require('../http/middleware/errhandler');




const projectRouter = Router()

projectRouter.post('/create', uploadMulter.single('image'),projectValidator(), checkLogin ,expressValidatorMapper, ProjectController.createProject)


module.exports = {
    projectRouter
}