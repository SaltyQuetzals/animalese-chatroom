import {AlphabetLoader} from './alphabetLoader.js';
import {AnimaleseSynthesizer} from './animaleseSynthesizer.js';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export async function synthesizeText(text, error) {
  //animalese.wav
  const wavPath = 'https://srv-file16.gofile.io/download/vF0fxF/animalese.wav';
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
  await loader.fetchAlphabetBuffer().catch(error || (() => {}));

  const animaleseSynthesizer = new AnimaleseSynthesizer(loader, audioContext);
  const animalese = animaleseSynthesizer.generateAnimaleseFor(text, 1.0);
  const source = audioContext.createBufferSource();
  source.buffer = animalese;
  source.connect(audioContext.destination);
  source.start();
}
