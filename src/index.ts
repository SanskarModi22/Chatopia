import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
var users: any = [];
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("envia nick", (socket) => {
    io.emit("info", "New user: " + socket);
    console.log(socket);
    users.push(socket);
    io.emit("users list", users);
    console.log(users);
  });
});

const currentDirectory = __dirname;
const parentDirectory = path.resolve(currentDirectory, "..");

app.get("/", (req: Request, res: Response) => {
  res.sendFile(parentDirectory + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
