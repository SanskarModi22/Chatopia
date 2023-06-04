import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

var clients: any = [];
let incr = 1;

const getUsersList = () => {
  var usersList: any = [];
  for (var i = 0; i < clients.length; i++) {
    usersList[i] = clients[i].n;
  }
  return usersList;
};
io.on("connection", (socket) => {
  clients.push(socket);
  socket.on("send chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("start", () => {
    console.info("Started.....");
    io.emit("nick", "guest" + incr);
    clients[clients.indexOf(socket)].n = "guest" + incr;
    incr++;
    io.emit("users list", getUsersList());
  });

  socket.on("set nick", function (nick) {
    io.emit("info", "New user: " + nick); //console.log(nick);
    clients[clients.indexOf(socket)].n = nick; //console.log(clients[clients.indexOf(socket)].n);
    io.emit("users list", getUsersList()); //console.log(getUsersList());
  });

  socket.on("disconnect", function () {
    if (clients[clients.indexOf(socket)].n == null) {
      //console.log('Guest disconnect!');
    } else {
      //console.log(clients[clients.indexOf(socket)].n +' disconnect!');
      io.emit(
        "info",
        "User " + clients[clients.indexOf(socket)].n + " disconnected."
      );
    }
    clients.splice(clients.indexOf(socket), 1); //clientIndex, 1);
    io.emit("users list", getUsersList());
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
