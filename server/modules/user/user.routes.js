import express from 'express';
const router = express.Router();
import userControllers from './user.controllers.js';

router.get('/', userControllers.getUser);
router.post('/register', userControllers.register);

export default router;
