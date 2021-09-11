const users = [];

interface IAddUserReturn {
  user?: {
    id: string;
    names: {
      first_name: string;
      last_name: string;
    };
    roomId: string;
  };
  errors?: string[];
}

function trimUser(user) {
  return {
    id: user.id.trim(),
    names: {
      first_name: user.names.first_name.trim(),
      last_name: user.names.last_name.trim(),
    },
  };
}

export function addTrader(socketId: string, user, roomId: string): IAddUserReturn {
  const newUser = trimUser(user);
  const newRoomId = roomId.trim();

  const errors: string[] = [];

  if (!newUser || !newRoomId) {
    errors.push('User and room are required.');
  }
  if (users.length > 3) {
    errors.push('Chat is full');
  }

  const existingUser = users.find(
    (u) => u.roomId === newRoomId && u.names === newUser.names,
  );

  if (existingUser) {
    errors.push('User is taken.');
  }

  if (errors.length > 0) {
    return { errors };
  }

  const newUserObj = { socketId, user: newUser, roomId: newRoomId };

  users.push(newUserObj);

  return { user };
}

export function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export function getUser(id) {
  return users.find((user) => user.id === id);
}

export function getUsersInRoom(roomId) {
  users.filter((user) => user.roomId === roomId);
}
