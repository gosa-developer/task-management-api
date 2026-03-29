import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../schemas/auth.schema';

const router = Router();

// Registration route
router.post('/register', authController.register);

// Login route with Zod validation
router.post('/login', validate(loginSchema), authController.login);

export default router;