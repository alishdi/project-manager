const { Router } = require('express');
const { ProjectController } = require('../http/controller/project.controller');


const projectRouter = Router()
projectRouter.post('/create',ProjectController.createProject)


module.exports={
    projectRouter
}