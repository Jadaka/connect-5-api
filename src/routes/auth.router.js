import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.use('/signIn', signIn);
authRouter.use('/signUp', signUp);

export default authRouter;
