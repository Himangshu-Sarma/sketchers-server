const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "http://localhost:3000" });

io.on("connection", (socket) => {

  console.log("Console connected");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  })

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  })

  socket.on("changeConfiguration", (arg) => {
    socket.broadcast.emit("changeConfiguration", arg);
  })
});

httpServer.listen(5000);
