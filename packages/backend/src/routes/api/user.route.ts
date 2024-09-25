import { Router } from 'express';
import userController from '@/controllers/user.controller';
import validateBody from '@/middleware/validateBody';
import { registerSchema, loginSchema, changePasswordSchema, resetPasswordSchema, forgotPasswordSchema, resendVerificationSchema, updateUserSchema } from '@/models/userSchema';
import ctrlWrapper from '@/helpers/ctrlWrapper';
import { authenticated } from '@/middleware/auth.middleware';

const userRouter: Router = Router();

userRouter.post('/register', validateBody(registerSchema), ctrlWrapper(userController.register.bind(userController)));
userRouter.post('/login', validateBody(loginSchema), ctrlWrapper(userController.login.bind(userController)));
userRouter.post('/logout', authenticated, ctrlWrapper(userController.logout.bind(userController)));

userRouter.get('/verify/:verificationToken', ctrlWrapper(userController.verifyEmail.bind(userController)));
userRouter.post('/resend-verification', validateBody(resendVerificationSchema), ctrlWrapper(userController.resendVerificationEmail.bind(userController)));

userRouter.post('/change-password', authenticated, validateBody(changePasswordSchema), ctrlWrapper(userController.changePassword.bind(userController)));
userRouter.post('/forgot-password', validateBody(forgotPasswordSchema), ctrlWrapper(userController.forgotPassword.bind(userController)));
userRouter.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(userController.resetPassword.bind(userController)));

userRouter.put('/update-user', authenticated, validateBody(updateUserSchema), ctrlWrapper(userController.updateUser.bind(userController)));
export default userRouter;