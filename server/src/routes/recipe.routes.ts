import { Router } from 'express';
import * as controller from '../controllers/recipe.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', controller.getAll);
router.get('/mine', authenticateToken, controller.getMine);
router.post('/', authenticateToken, controller.create);
router.put('/:id', authenticateToken, controller.update);
router.delete('/:id', authenticateToken, controller.remove);
router.post('/:id/rate', authenticateToken, controller.rate);

export default router;
