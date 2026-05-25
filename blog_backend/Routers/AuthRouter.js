const express = require('express');
const { registerController, loginController, displaySarchedUsersController, logoutController,logoutFromAllDvController, forgetPasswordController, changePasswordController, editProfileController } = require('../Controllers/AuthController');
const isAuth = require('../Middleware/isAuth');
const AuthRouter = express.Router();
const upload = require('../Controllers/AuthController').upload; 


AuthRouter.post('/registration',upload.single('profileimg'),registerController);
AuthRouter.post('/edit-profile',upload.single('profileimg'),isAuth,editProfileController);
AuthRouter.post('/login',loginController);
AuthRouter.post('/forgetpassword',forgetPasswordController);
AuthRouter.post('/changepassword',changePasswordController);
AuthRouter.get('/searchusers',displaySarchedUsersController);
AuthRouter.post('/logout',isAuth,logoutController);
AuthRouter.post('/logout-from-all-device',isAuth,logoutFromAllDvController);

module.exports = AuthRouter;