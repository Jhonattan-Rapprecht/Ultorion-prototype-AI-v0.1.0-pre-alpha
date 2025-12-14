import { Router } from 'express';
import { getContracts } from './controller.js';

const router = Router();

router.get('/', getContracts);

export default router;
