import io from 'socket.io-client';
import {writable} from 'svelte/store';

export const playerCount = writable(0);

export const socket = io.connect('http://localhost:3000'); // 'http://animalese-chatroom.herokuapp.com:80');

socket.on('connect', function () {
  console.log('[open] Connection established');
});

socket.on('playerMessage', function (data) {
  const {text, name} = data;
  synthesizeText(text);
});

socket.on('playerConnected', function (data) {
  const {socketId, nClients, name, file} = data;
  playerCount.set(nClients);
});

socket.on('playerDisconnected', function (data) {
  const {socketId, nClients, name} = data;
  playerCount.set(nClients);
});
