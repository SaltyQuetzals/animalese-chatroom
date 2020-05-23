<script>
  import Tiles from './Tiles.svelte';
  import ChatBar from './ChatBar.svelte';
  import io from 'socket.io-client';
  import {villagerNames} from './villagers.js';
  import {AlphabetLoader} from './alphabetLoader.js';
  import {AnimaleseSynthesizer} from './animaleseSynthesizer.js';
  import {onMount} from 'svelte';

  const names = Array.from(Array(100)).map(e => {
    const name =
      villagerNames[Math.floor(Math.random() * villagerNames.length)];
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  async function synthesizeText(text) {
    const wavPath = 'animalese.wav';
    const wavSecondsPerLetter = 0.15;
    const outputSecondsPerLetter = 0.075;
    /** @type {AudioContext} */
    const audioContext = new AudioContext();
    const loader = new AlphabetLoader(
      wavPath,
      wavSecondsPerLetter,
      outputSecondsPerLetter,
      audioContext
    );
    await loader.fetchAlphabetBuffer();

    const animaleseSynthesizer = new AnimaleseSynthesizer(loader, audioContext);
    const animalese = animaleseSynthesizer.generateAnimaleseFor(text, 1.0);
    const source = audioContext.createBufferSource();
    source.buffer = animalese;
    source.connect(audioContext.destination);
    source.start();
  }

  // ----------- Server Stuff -----------

  const socket = io.connect('http://animalese-chatroom.herokuapp.com:80');

  socket.on('connect', function(){
    console.log('[open] Connection established');
  });

  socket.on('playerMessage', function(data){
    const {text} = data
    synthesizeText(text);
  });

  // ----------- Chat Stuff -----------

  onMount(() => {
    var input = document.getElementById('chatText');

    input.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        socket.emit('playerSpeaks', {text: input.value});
        input.value = '';
      }
    });
  })
</script>

<ChatBar />
<Tiles />
