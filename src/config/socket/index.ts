import { Server } from 'socket.io';

export default function setUpSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  return io;
}
