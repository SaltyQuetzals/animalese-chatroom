import socketIO from 'socket.io';
import express from 'express';
import http from 'http';

const PORT = process.env.PORT || 3000;
const app = express();
const server = new http.Server(app);
let clientCount = 0;

const io = socketIO(server, {pingInterval: 5000, pingTimeout: 1000});

enum SocketEvent {
  PLAYER_SPEAK = 'playerSpeaks',
  PLAYER_MESSAGE = 'playerMessage',
  PLAYER_CONNECTED = 'playerConnected',
  PLAYER_DISCONNECTED = 'playerDisconnected',
}

io.on('connection', socket => {
  clientCount++;
  console.log(`${socket.id} has connected!`);
  io.emit(SocketEvent.PLAYER_CONNECTED, {socketId: socket.id, nClients: clientCount});
  socket.on(SocketEvent.PLAYER_SPEAK, (data: {text: string}) => {
    const {text} = data;
    console.log(`${socket.id}: ${text}`);
    socket.broadcast.emit(SocketEvent.PLAYER_MESSAGE, {text});
  });
  socket.on('disconnect', async () => {
    clientCount--;
    console.log(`${socket.id} has disconnected`);
    io.emit(SocketEvent.PLAYER_DISCONNECTED, {socketId: socket.id, nClients: clientCount});
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
