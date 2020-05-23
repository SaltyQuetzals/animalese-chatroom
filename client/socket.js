import io from 'socket.io-client';
import {writable} from 'svelte/store';

export const connections = writable([]);

// http://localhost:3000
export const socket = io.connect('http://animalese-chatroom.herokuapp.com:80');

socket.on('connect', function () {
  console.log('[open] Connection established');
});

socket.on('playerMessage', function (data) {
  const {text, name} = data;
  synthesizeText(text);
});

['playerConnected', 'playerDisconnected'].forEach(eventName => {
  socket.on(eventName, function (data) {
    connections.set(Object.values(data.connections));
  });
});
