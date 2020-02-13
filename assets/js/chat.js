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
  appendMsg(value);
  input.value = "";
};

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
