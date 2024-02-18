const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const io = new Server(process.env.PORT);

app.use(
  cors({
    origin: '*', // Allow requests from this origin
    methods: ["GET", "POST"], // Allow only specified HTTP methods
    allowedHeaders: ["Content-Type"],
  })
); // Allow all origins (you can configure more specific settings if needed)

console.log('DEBUG env', process.env);
io.on("connection", (socket) => {
  socket.on("join", ({ username }) => {
    console.log("DEBUG username", username);
    io.emit(
      "notification",
      `Hey ${username}!, Welcome to the chat. Messages are end-to-end encrypted. No one outside of this chat, not even chatapp, can read to them.`
    );
  });
  socket.on("clientMessage", (data) => {
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
