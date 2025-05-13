import express from 'express';
const router = express.Router();
import userControllers from './user.controllers.js';
import { validateRegister } from '../../middleware/validateRegister.js';
import { registerSchema } from '../../schemas/registerSchema.js';

router.get('/', userControllers.getUser);
router.post(
  '/register',
  validateRegister(registerSchema),
  userControllers.register
);

export default router;
