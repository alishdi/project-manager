const { Router } = require('express');
const { projectRouter } = require('./project');
const { teamRouter } = require('./team');
const { authRouter } = require('./auth');
const { userRouter } = require('./user');
const indexRouter = Router()

indexRouter.use('/auth', authRouter);
indexRouter.use('/project', projectRouter);
indexRouter.use('/team', teamRouter);
indexRouter.use('/user', userRouter);

module.exports = {
    indexRouter
}