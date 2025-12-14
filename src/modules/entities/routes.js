import { Router } from 'express';
import { getEntities } from './controller.js';

const router = Router();

router.get('/', getEntities);

export default router;
