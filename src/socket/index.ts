import { Socket } from 'socket.io';
import {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
} from '@utils/helps/users';

export default function socketEvents(io) {
  io.on('connection', (socket: Socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { user, error } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to the room ${user.room}`,
      });
      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'admin', text: `${user.name}, has joined!` });

      socket.join(user.room);

      callback();
    });

    socket.on('sendMessage', (message, callback) => {
      console.log('message:', message);

      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      // callback();
    });

    socket.on('end', () => {
      console.log('Disconnected');
    });
  });
}
