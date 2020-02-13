const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

export const handleNewUser = ({ nickName }) => {
  fireNotification(`${nickName} just joined!`, "rgb(0, 122, 255)");
};

export const handleDisconnected = ({ nickName }) => {
  fireNotification(`${nickName} just left!`, "rgb(255, 149, 0)");
};
