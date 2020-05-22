// animalese.js
// (C) 2014 Josh Simmons
// http://github.com/acedio/animalese.js

const Animalese = function (letters_file, onload) {
  this.Animalese = function (script, shorten, pitch) {
    function shortenWord(str) {
      if (str.length > 1) {
        return str[0] + str[str.length - 1];
      }
      return str;
    }

    let processed_script = script;
    if (shorten) {
      processed_script = script
        .replace(/[^a-z]/gi, ' ')
        .split(' ')
        .map(shortenWord)
        .join('');
    }

    const data = [];

    const sample_freq = 44100;
    const library_letter_secs = 0.15;
    const library_samples_per_letter = Math.floor(
      library_letter_secs * sample_freq
    );
    const output_letter_secs = 0.075;
    const output_samples_per_letter = Math.floor(
      output_letter_secs * sample_freq
    );

    for (let c_index = 0; c_index < processed_script.length; c_index++) {
      const c = processed_script.toUpperCase()[c_index];
      if (c >= 'A' && c <= 'Z') {
        const library_letter_start =
          library_samples_per_letter * (c.charCodeAt(0) - 'A'.charCodeAt(0));

        for (var i = 0; i < output_samples_per_letter; i++) {
          data[c_index * output_samples_per_letter + i] = this.letter_library[
            44 + library_letter_start + Math.floor(i * pitch)
          ];
        }
      } else {
        // non pronouncable character or space
        for (var i = 0; i < output_samples_per_letter; i++) {
          data[c_index * output_samples_per_letter + i] = 127;
        }
      }
    }

    const wave = new RIFFWAVE();
    wave.header.sampleRate = sample_freq;
    wave.header.numChannels = 1;
    wave.Make(data);

    return wave;
  };

  const xhr = new XMLHttpRequest();
  xhr.open('GET', letters_file);
  xhr.responseType = 'arraybuffer';
  const req = this;
  xhr.onload = function (e) {
    req.letter_library = new Uint8Array(this.response);
    onload();
  };
  xhr.send();
};
