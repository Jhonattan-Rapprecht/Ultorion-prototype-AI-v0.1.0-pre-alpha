import { Router } from 'express';
import contractRoutes from '../modules/contracts/routes.js';
import entityRoutes from '../modules/entities/routes.js';

const router = Router();

// Welcome message at /api/
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Ulterion API' });
});

// Mount feature routers
router.use('/contracts', contractRoutes);
router.use('/entities', entityRoutes);

export default router;
