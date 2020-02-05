const socketController = socket => {
  socket.on("setNickName", ({ nickName }) => {
    console.log(nickName);
    socket.nickName = nickName;
  });
};

export default socketController;
