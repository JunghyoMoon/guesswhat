import events from "./events";

const socketController = socket => {
  socket.on(events.setNickName, ({ nickName }) => {
    socket.nickName = nickName;
    socket.broadcast.emit(events.newUser, { nickName });
  });
};

export default socketController;
