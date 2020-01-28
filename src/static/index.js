const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}

function setNickName(nickName) {
  socket.emit("setNickName", { nickName });
  console.log(`Your nickname is ${nickName}`);
}

function handleMessageNotif(data) {
  const { message, nickName } = data;
  console.log(`${nickName}: ${message}`);
}

socket.on("messageNotif", handleMessageNotif);
