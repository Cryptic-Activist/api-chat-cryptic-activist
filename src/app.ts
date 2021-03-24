import 'dotenv/config';
import '@database/index';
import setUpSocket from '@config/socket';
import express from 'express';
import { createServer } from 'http';

import middlewares from '@middlewares/index';

import socketEvents from '@socket/index';

const app = express();

middlewares(app);

const httpServer = createServer(app);

const io = setUpSocket(httpServer);

socketEvents(io);

export default httpServer;
