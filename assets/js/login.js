const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickName";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickName = localStorage.getItem(NICKNAME);

const logIn = nickName => {
  window.socket = io("/");
  window.socket.emit(window.events.setNickName, { nickName });
};

if (nickName === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickName);
}

const handleFormSubmit = event => {
  event.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  logIn(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
