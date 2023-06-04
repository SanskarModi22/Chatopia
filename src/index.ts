import express,{Request,Response} from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
import path from 'path';

const currentDirectory = __dirname;
const parentDirectory = path.resolve(currentDirectory, '..');

app.get('/', (req:Request, res:Response) => {
    res.sendFile(parentDirectory + '/index.html');
  });

server.listen(3000,()=>{
    console.log('listening on *:3000');
})