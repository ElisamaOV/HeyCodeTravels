import express from 'express';
const router = express.Router();
import userControllers from './user.controllers.js';
import { validateRegister } from '../../middleware/validateRegister.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { verifyToken } from '../../middleware/verifyToken.js';

router.get('/', userControllers.getUser);
router.post(
  '/register',
  validateRegister(registerSchema),
  userControllers.register
);
router.post('/login', userControllers.login);
router.get('/userById', verifyToken, userControllers.userById);

export default router;
