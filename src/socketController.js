import events from "./events";

const socketController = socket => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  socket.on(events.setNickName, ({ nickName }) => {
    socket.nickName = nickName;
    broadcast(events.newUser, { nickName });
  });

  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickName: socket.nickName });
  });
};

export default socketController;
