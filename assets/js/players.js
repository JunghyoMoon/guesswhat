import { disableCanvas, hideCtrls, enableCanvas, showCtrls } from "./paint";

const board = document.getElementById("jspBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickName}: ${player.point}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideCtrls();
};

export const handlePainterNotif = ({ word }) => {
  enableCanvas();
  showCtrls();
  setNotifs("");
  setNotifs(`You are the painter! answer is: ${word}`);
};
