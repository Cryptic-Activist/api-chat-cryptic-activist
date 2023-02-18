import { Router } from 'express';

import { getSystemMessagesController } from '../../controllers/systemMessages';
import { authenticateUser } from '../../middlewares/authorization';

const router = Router();

router.get('', authenticateUser, getSystemMessagesController);

export default router;
