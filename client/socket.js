import io from 'socket.io-client';

export const socket = io.connect('http://animalese-chatroom.herokuapp.com:80');

socket.on('connect', function () {
  console.log('[open] Connection established');
});

socket.on('playerMessage', function (data) {
  const {text} = data;
  synthesizeText(text);
});
