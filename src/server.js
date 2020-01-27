import { join } from "path";
import express from "express";
import dotenv from "dotenv";
import socketIO from "socket.io";
import logger from "morgan";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const handleListening = () => {
  console.log(`😎 Listening on port ${PORT}!!`);
};

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, handleListening);

// io라는 변수 생성 : io가 모든 이벤트들을 알고 있어야 하기 때문?
const io = socketIO.listen(server);

// 'socket'이라는 인자를 받아 안에서 id를 추출하여 배열에 추가
// socket.io는 서버가 꺼져 있어도 계속해서 연결을 시도함
// 아래의 인터벌 함수를 통해 현재 접속되어 있는 socket의 id를 출력
let sockets = [];

io.on("connection", socket => sockets.push(socket.id));

// setInterval(() => console.log(sockets), 3000);
