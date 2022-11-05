import Router from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import UserController from '../users/UserController.js';

const router = new Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/auth', authMiddleware, UserController.auth);

export default router;
