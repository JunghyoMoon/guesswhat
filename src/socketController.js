import events from "./events";
import { chooseWord } from "../assets/js/words";

let sockets = [];
let inProgress = false;
let word = null;
let painter = null;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
      painter = choosePainter();
      word = chooseWord();
      superBroadcast(events.gameStarting);
      setTimeout(() => {
        superBroadcast(events.gameStarted);
        io.to(painter.id).emit(events.painterNotif, { word });
      }, 5000);
    }
  };

  const quitGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
  };

  const addPoint = id => {
    sockets = sockets.map(socket => {
      if (socket.id === id) {
        socket.point += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    quitGame();
  };

  socket.on(events.setNickName, ({ nickName }) => {
    socket.nickName = nickName;
    sockets.push({ id: socket.id, nickName, point: 0 });
    broadcast(events.newUser, { nickName });
    sendPlayerUpdate();
    if (sockets.length === 2) {
      startGame();
    }
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    if (sockets.length === 1) {
      quitGame();
    } else if (painter) {
      if (painter.id === socket.id) {
        quitGame();
      }
    }
    broadcast(events.disconnected, { nickName: socket.nickName });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) => {
    if (message === word) {
      superBroadcast(events.newMsg, {
        message: `Winner is ${socket.nickName}, and Answer is: ${word}`,
        nickName: "Bot"
      });
      addPoint(socket.id);
    } else {
      broadcast(events.newMsg, { message, nickName: socket.nickName });
    }
  });

  socket.on(events.beginPath, ({ x, y }) => {
    broadcast(events.beganPath, { x, y });
  });

  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
