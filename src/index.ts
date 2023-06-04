import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

interface Client {
  socket: Socket;
  name: string;
}

const clients: Client[] = [];
let incr = 1;
const currentDirectory = __dirname;
const parentDirectory = path.resolve(currentDirectory, "..");

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(parentDirectory, "index.html"));
});

const getUsersList = (): string[] => {
  return clients.map((client) => client.name);
};

const setUserTyping = (index: number): string[] => {
  const usersList = [...getUsersList()];
  usersList[index] = "💬 " + clients[index].name;
  return usersList;
};

io.on("connection", (socket: Socket) => {
  clients.push({ socket, name: "" });

  socket.on("send chat message", (msg: [string, string]) => {
    io.emit("chat message", msg);
  });

  socket.on("start", () => {
    console.info("Started.....");
    const guestName = "guest" + incr;
    socket.emit("nick", guestName);
    clients[clients.findIndex((client) => client.socket === socket)].name =
      guestName;
    incr++;
    io.emit("users list", getUsersList());
  });

  socket.on("set nick", (nick: string) => {
    io.emit("info", "New user: " + nick);
    clients[clients.findIndex((client) => client.socket === socket)].name =
      nick;
    io.emit("users list", getUsersList());
  });

  socket.on("typing", () => {
    io.emit(
      "typing signal",
      setUserTyping(clients.findIndex((client) => client.socket === socket))
    );
  });

  socket.on("not typing", () => {
    io.emit("typing signal", getUsersList());
  });

  socket.on("disconnect", () => {
    const client = clients.find((client) => client.socket === socket);
    if (client) {
      if (client.name) {
        io.emit("info", "User " + client.name + " disconnected.");
      }
      clients.splice(clients.indexOf(client), 1);
      io.emit("users list", getUsersList());
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
