import socketIO from 'socket.io';
import * as http from 'http';

const PORT = process.env.PORT || 3000;
const app = http.createServer();

const io = socketIO(app, {pingInterval: 5000, pingTimeout: 1000});

enum SocketEvent {
  PLAYER_SPEAK = 'playerSpeaks',
  PLAYER_MESSAGE = 'playerMessage',
  PLAYER_CONNECTED = 'playerConnected',
  PLAYER_DISCONNECTED = 'plaerDisconnected',
}

io.on('connection', socket => {
  console.log(`${socket.id} has connected!`);
  io.emit(SocketEvent.PLAYER_CONNECTED, {socketId: socket.id});
  socket.on(SocketEvent.PLAYER_SPEAK, (data: {text: string}) => {
    const {text} = data;
    socket.emit(SocketEvent.PLAYER_MESSAGE, {text});
  });
  socket.on('disconnect', async () => {
    console.log(`${socket.id} has disconnected`);
    io.emit(SocketEvent.PLAYER_DISCONNECTED, {socketId: socket.id});
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
