import { Router } from 'express';
import { getContracts } from './controller.js';   // adjust if you have a controller

const router = Router();

// Example route
router.get('/', getContracts);

export default router;
