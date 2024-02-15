const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const isDev = app.settings.env === "development";
const url = isDev
  ? "http://localhost:3000/"
  : "https://sketchers-client.vercel.app/";
console.log("isDev", isDev, " url", url);

app.use(cors({ origin: url }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: url });

io.on("connection", (socket) => {
  console.log("Console connected");

  try {
    socket.on("beginPath", (arg) => {
      socket.broadcast.emit("beginPath", arg);
    });

    socket.on("drawLine", (arg) => {
      socket.broadcast.emit("drawLine", arg);
    });

    socket.on("changeConfiguration", (arg) => {
      socket.broadcast.emit("changeConfiguration", arg);
    });
  } catch (error) {
    console.log(error);
  }
});

httpServer.listen(5000);
