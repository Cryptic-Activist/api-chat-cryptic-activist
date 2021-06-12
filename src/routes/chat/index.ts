import { Router } from 'express';

import { index, createChat } from '@controllers/chat';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

router.get('/index', index);

router.post('/create', authenticateUser, createChat);

export default router;
