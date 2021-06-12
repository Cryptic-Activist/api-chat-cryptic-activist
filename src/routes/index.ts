import { Application } from 'express';

import trade from './chat';

export default (app: Application): void => {
  app.use('/chat', trade);
};
