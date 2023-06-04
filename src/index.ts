import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

const name = "Sanskar";
app.get("/", (req, res) => {
  res.send(`<h1>Hello ${name}</h1>`);
});

server.listen(3000,()=>{
    console.log('listening on *:3000');
})