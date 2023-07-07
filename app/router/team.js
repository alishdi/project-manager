const { Router } = require('express');
const { checkLogin } = require('../http/middleware/athologin');
const { TeamController } = require('../http/controller/team.controller');
const { teamValidation } = require('../http/validations/team');
const { expressValidatorMapper } = require('../http/middleware/errhandler');
const { mongoIDValidator } = require('../http/validations/public');

const teamRouter = Router()

teamRouter.post('/create', checkLogin, teamValidation(), expressValidatorMapper, TeamController.createTeam)
teamRouter.get('/all', checkLogin, expressValidatorMapper, TeamController.getListOfTeam)
teamRouter.get('/me', checkLogin, TeamController.getMyTeams)
teamRouter.get('/invite/:teamID/:username', checkLogin, TeamController.inviteUserToTeam)
teamRouter.delete('/remove/:id', checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.removeTeamById)
teamRouter.get('/:id', checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamByID)


module.exports = {
    teamRouter
}