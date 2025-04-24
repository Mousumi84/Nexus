const express = require('express');
const { registerController, loginController, displaySarchedUsersController, logoutController,logoutFromAllDvController } = require('../Controllers/AuthController');
const isAuth = require('../Middleware/isAuth');
const AuthRouter = express.Router();
const upload = require('../Controllers/AuthController').upload; 


AuthRouter.post('/registration',upload.single('profileimg'),registerController);
AuthRouter.post('/login',loginController);
AuthRouter.get('/searchusers',displaySarchedUsersController);
AuthRouter.post('/logout',isAuth,logoutController);
AuthRouter.post('/logout-from-all-device',isAuth,logoutFromAllDvController);

module.exports = AuthRouter;