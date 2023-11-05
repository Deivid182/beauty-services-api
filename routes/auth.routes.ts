import { Router } from 'express';
import { forgotPassword, newUser, resetPassword, verifyUser } from '../controllers/auth.controller';
import { validateSchema } from '../middleware/validate.schema';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schemas/user.schema';


const authRouter = Router();

authRouter.post('/', validateSchema(createUserSchema), newUser);

authRouter.get('/:id/verify/:verificationCode', validateSchema(verifyUserSchema), verifyUser);

authRouter.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword);

authRouter.post('/reset-password/:id/:passwordResetCode', validateSchema(resetPasswordSchema), resetPassword);

export default authRouter