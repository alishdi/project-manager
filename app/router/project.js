const { Router } = require('express');
const { ProjectController } = require('../http/controller/project.controller');
const { projectValidator } = require('../http/validations/project');

const { checkLogin } = require('./../http/middleware/athologin');
const { uploadMulter } = require('../utils/multer');
const { expressValidatorMapper } = require('../http/middleware/errhandler');
const { mongoIDValidator } = require('../http/validations/public');




const projectRouter = Router()

projectRouter.post('/create', uploadMulter.single('image'),projectValidator(), checkLogin ,expressValidatorMapper, ProjectController.createProject);
projectRouter.get('/list', checkLogin , ProjectController.getAllProject)
projectRouter.get('/:id', checkLogin ,mongoIDValidator(),expressValidatorMapper, ProjectController.getProjectById)
projectRouter.delete('/remove/:id', checkLogin ,mongoIDValidator(),expressValidatorMapper, ProjectController.removeProject)
projectRouter.put('/edit/:id',mongoIDValidator(),expressValidatorMapper, checkLogin , ProjectController.updateProject)


module.exports = {
    projectRouter
}