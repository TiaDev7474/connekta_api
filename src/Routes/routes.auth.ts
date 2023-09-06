const authRouter = require('express').Router();
const { userValidationRules, validate } = require('../Middleware/middleware.inputValidator');
const authController = require('../Controller/controller.auth');

authRouter.post('/register', userValidationRules(), validate ,authController.register);
authRouter.post('/login', userValidationRules(), validate, authController.login);
module.exports = authRouter;