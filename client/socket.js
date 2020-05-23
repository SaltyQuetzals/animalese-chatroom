import io from 'socket.io-client';
import {writable} from 'svelte/store';
import {synthesizeText} from './synthesizeText.js';

export const connections = writable([]);

export const socket = io.connect('https://animalese-chatroom.herokuapp.com');

let internalConnections = [];

socket.on('connect', function () {
  console.log('[open] Connection established');
});

function isSpeaking(socketId, speaking) {
  internalConnections.forEach(entry => {
    if (entry.socketId === socketId) {
      entry.speaking = speaking;
    }
  });
  connections.set(internalConnections);
}

socket.on('playerMessage', async function (data) {
  const {text, socketId} = data;
  isSpeaking(socketId, true);
  (await synthesizeText(text)).onended = function () {
    isSpeaking(socketId, false);
  };
});

['playerConnected', 'playerDisconnected'].forEach(eventName => {
  socket.on(eventName, function (data) {
    internalConnections = Object.values(data.connections);
    connections.set(internalConnections);
  });
});
