const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Get username from client
  socket.on("setUsername", (username) => {
    socket.username = username;
    io.emit("userJoined", username);
  });

  // Handle chat message
  socket.on("chatMessage", (msg) => {
    const messageData = {
      username: socket.username || "Anonymous",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    io.emit("chatMessage", messageData);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("userLeft", socket.username);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
