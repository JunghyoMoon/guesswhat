import {
  disableCanvas,
  hideCtrls,
  enableCanvas,
  showCtrls,
  resetCanvas
} from "./paint";
import { disableChat } from "./chat";

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
  disableChat();
  setNotifs(`You are the painter! answer is: ${word}`);
};

export const handleGameEnded = () => {
  setNotifs("Game Ended!");
  disableCanvas();
  hideCtrls();
  resetCanvas();
};

export const handleGameStarting = () => setNotifs("Game will start soon");
