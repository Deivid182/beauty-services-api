import { Router } from 'express';
import { createSession, refreshAccessToken } from '../controllers/auth.controller';
import { validateSchema } from '../middleware/validate.schema';
import { createSessionSchema } from '../schemas/user.schema';


const authRouter = Router();

authRouter.post('/', validateSchema(createSessionSchema), createSession);

authRouter.post('/refresh', refreshAccessToken);

export default authRouter