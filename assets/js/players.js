import { disableCanvas, hideCtrls } from "./paint";

const board = document.getElementById("jspBoard");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickName}: ${player.point}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  disableCanvas();
  hideCtrls();
};
