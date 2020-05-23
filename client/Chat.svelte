<script>
  import { socket } from "./socket.js";
  import { synthesizeText } from "./synthesizeText.js";

  let text = "";

  function keydown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      socket.emit("playerSpeaks", { text: text });
      synthesizeText(text);
      text = "";
    }
  }
</script>

<style>
  input {
    display: block;
    background: none;
    border: 0;
    padding: 0.5em 0 0 0;
    margin: auto;
    font: inherit;
    color: inherit;
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }
</style>

<h2>Chat</h2>
To: Everyone
<input
  type="text"
  placeholder="Type message here..."
  bind:value={text}
  on:keydown={keydown} />
