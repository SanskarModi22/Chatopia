"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var http_1 = require("http");
var path_1 = require("path");
var socket_io_1 = require("socket.io");
var app = (0, express_1["default"])();
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server);
var clients = [];
var incr = 1;
var currentDirectory = __dirname;
var parentDirectory = path_1["default"].resolve(currentDirectory, "..");
app.get("/", function (req, res) {
    res.sendFile(path_1["default"].join(parentDirectory, "index.html"));
});
var getUsersList = function () {
    return clients.map(function (client) { return client.name; });
};
var setUserTyping = function (index) {
    var usersList = __spreadArray([], getUsersList(), true);
    usersList[index] = "💬 " + clients[index].name;
    return usersList;
};
io.on("connection", function (socket) {
    clients.push({ socket: socket, name: "" });
    socket.on("send chat message", function (msg) {
        io.emit("chat message", msg);
    });
    socket.on("start", function () {
        console.info("Started.....");
        var guestName = "guest" + incr;
        socket.emit("nick", guestName);
        clients[clients.findIndex(function (client) { return client.socket === socket; })].name =
            guestName;
        incr++;
        io.emit("users list", getUsersList());
    });
    socket.on("set nick", function (nick) {
        io.emit("info", "New user: " + nick);
        clients[clients.findIndex(function (client) { return client.socket === socket; })].name =
            nick;
        io.emit("users list", getUsersList());
    });
    socket.on("typing", function () {
        io.emit("typing signal", setUserTyping(clients.findIndex(function (client) { return client.socket === socket; })));
    });
    socket.on("not typing", function () {
        io.emit("typing signal", getUsersList());
    });
    socket.on("disconnect", function () {
        var client = clients.find(function (client) { return client.socket === socket; });
        if (client) {
            if (client.name) {
                io.emit("info", "User " + client.name + " disconnected.");
            }
            clients.splice(clients.indexOf(client), 1);
            io.emit("users list", getUsersList());
        }
    });
});
server.listen(3000, function () {
    console.log("listening on *:3000");
});
