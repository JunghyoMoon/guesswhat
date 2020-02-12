const notifications = document.getElementById("jsNotifications");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notifications.appendChild(notification);
};

export const handleNewUser = ({ nickName }) => {
  fireNotification(`${nickName} just joined!`, "blue");
};
