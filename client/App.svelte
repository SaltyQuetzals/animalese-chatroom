<script>
  import Tiles from './Tiles.svelte';
  import ChatBar from './ChatBar.svelte';
  import {villagerNames} from './villagers.js';
  import {AlphabetLoader} from './alphabetLoader.js';
  import {AnimaleseSynthesizer} from './animaleseSynthesizer.js';

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

  window.addEventListener('click', () => {
    synthesizeText(prompt('Please input what you would like to say.'));
  });
</script>

<ChatBar />
<Tiles />
