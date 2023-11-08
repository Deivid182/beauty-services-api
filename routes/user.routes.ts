import { Router } from 'express';
import { forgotPassword, getCurrentUser, newUser, resetPassword, verifyUser } from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';
import { validateSchema } from '../middleware/validate.schema';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schemas/user.schema';

const userRouter = Router();

userRouter.post('/', validateSchema(createUserSchema), newUser);

userRouter.get('/:id/verify/:verificationCode', validateSchema(verifyUserSchema), verifyUser);

userRouter.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword);

userRouter.post('/reset-password/:id/:passwordResetCode', validateSchema(resetPasswordSchema), resetPassword);

userRouter.get('/current', requireUser, getCurrentUser)

export default userRouter