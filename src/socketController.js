import events from "./events";

const socketController = socket => {
  socket.on(events.setNickName, ({ nickName }) => {
    socket.nickName = nickName;
  });
};

export default socketController;
