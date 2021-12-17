import { Router } from 'express';

import {
  // index,
  createChatController,
} from '@controllers/chat';
import { authenticateUser } from '@middlewares/authorization';

const router = Router();

// router.get('/index', index);

router.post('/create', authenticateUser, createChatController);

export default router;
