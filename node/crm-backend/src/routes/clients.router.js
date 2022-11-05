import Router from 'express';
import ClientController from '../clients/ClientController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = new Router();

router.get('/', authMiddleware, ClientController.getAll);
router.get('/:id', authMiddleware, ClientController.getOne);
router.post('/create', authMiddleware, ClientController.create);
router.patch('/update', authMiddleware, ClientController.update);
router.delete('/:id', authMiddleware, ClientController.delete);

export default router;
