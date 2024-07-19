const express = require("express");
const connectToMongo = require("./db.js");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

const isDev = app.settings.env === "development";
const URL = isDev
? "http://localhost:3000"
: "https://sketchers-client.vercel.app";
app.use(express.json());
app.use(cors({ origin: URL }));

connectToMongo();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });
const port = 8888;

io.on("connection", (socket) => {
  // console.log("server connected");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});


app.get("/hi", (req, res) => {
  res.send("Hello World");
}); 

app.use("/sketchers/api", userRoutes);

app.listen(port, () => {
  try {
    console.log(`App listening on port : ${port}`);
    httpServer.listen(5000);
  }
  catch (error) {
    console.log(error);
  }
});

