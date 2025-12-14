import { Router } from 'express';
import contractRoutes from '../modules/contracts/routes.js';
import entityRoutes from '../modules/entities/routes.js';

const router = Router();

router.use('/contracts', contractRoutes);
router.use('/entities', entityRoutes);

export default router;
