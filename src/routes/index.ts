import { Application } from 'express';

import chat from './chat';
import systemMessages from './systemMessages';

export default (app: Application): void => {
  console.log('Routes');
  app.use('/chat', chat);
  app.use('/system-messages', systemMessages);
};
