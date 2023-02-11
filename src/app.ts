import '@database/index';
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';

import middlewares from '@middlewares/index';

import routes from '@routes/index';

const app = express();

middlewares(app);

const httpServer = createServer(app);

// const io = setUpSocket(httpServer);

// socketEvents(io);

routes(app);

export default httpServer;
