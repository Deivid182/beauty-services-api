import { Router } from 'express';
import { createUser } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/', createUser);

export default authRouter