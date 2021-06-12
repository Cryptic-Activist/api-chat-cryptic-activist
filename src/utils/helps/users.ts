const users = [];

export function addUser({ id, name, room }) {
  const newName = name.trim();
  const newRoom = room.trim();

  const existingUser = users.find(
    (user) => user.newRoom === newRoom && user.newName === newName,
  );

  if (!newName || !newRoom) {
    return { error: 'Username and room are required.' };
  }
  if (existingUser) {
    return { error: 'Username is taken.' };
  }

  const user = { id, name: newName, room: newRoom };

  users.push(user);

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

export function getUsersInRoom(room) {
  users.filter((user) => user.room === room);
}
