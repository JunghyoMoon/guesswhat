import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickName) => {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="author ${nickName ? "out" : "self"}">${
    nickName ? nickName : "You"
  }: ${text}</span>
    `;
  messages.appendChild(li);
};

const handleSendMsg = event => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  appendMsg(value);
  input.value = "";
};

export const handleNewMessage = ({ message, nickName }) =>
  appendMsg(message, nickName);

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
