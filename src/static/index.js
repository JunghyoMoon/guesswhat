const socket = io("/");

socket.on("hello", () => console.log("Somebody said hello!"));

socket.emit("howdy!");
