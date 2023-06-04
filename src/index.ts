import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
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
