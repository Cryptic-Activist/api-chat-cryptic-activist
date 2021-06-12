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

      socket.join(user.room);

      socket.emit('adminMessage', {
        user: { name: 'Cryptic Activist Bot' },
        text: `${user.name}, welcome to the room ${user.room}`,
      });

      socket.broadcast.to(user.room).emit('message', {
        user: { name: 'Cryptic Activist Bot' },
        text: `${user.name}, has joined!`,
      });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on('sendMessage', (message) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });
    });

    socket.on('end', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: {
            name: 'admin',
          },
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
}
