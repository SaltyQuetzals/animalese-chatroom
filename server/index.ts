import socketIO from 'socket.io';
import * as http from 'http';

const PORT = process.env.PORT || 3000;
const app = http.createServer();

const io = socketIO(app, { pingInterval: 5000, pingTimeout: 1000 });

enum SocketEvent {
    PLAYER_SPEAK = 'playerSpeaks',
    PLAYER_MESSAGE = 'playerMessage'
}

io.on('connection', socket => {
    console.log(`${socket.id} has connected!`);

    socket.on(SocketEvent.PLAYER_SPEAK, (data: { text: string }) => {
        const { text } = data;
        socket.emit(SocketEvent.PLAYER_MESSAGE, { text });
    });
    socket.on('disconnect', async () => {
        console.log(`${socket.id} has disconnected`);
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
