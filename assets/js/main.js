import { handleMessageNotif } from "./chat";

const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}

function setNickName(nickName) {
  socket.emit("setNickName", { nickName });
  console.log(`Your nickname is ${nickName}`);
}

socket.on("messageNotif", handleMessageNotif);
