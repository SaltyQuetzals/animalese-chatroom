<style>
  .bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1em;
    z-index: 3;
    height: 200px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.013) 8.1%,
      hsla(0, 0%, 0%, 0.049) 15.5%,
      hsla(0, 0%, 0%, 0.104) 22.5%,
      hsla(0, 0%, 0%, 0.175) 29%,
      hsla(0, 0%, 0%, 0.259) 35.3%,
      hsla(0, 0%, 0%, 0.352) 41.2%,
      hsla(0, 0%, 0%, 0.45) 47.1%,
      hsla(0, 0%, 0%, 0.55) 52.9%,
      hsla(0, 0%, 0%, 0.648) 58.8%,
      hsla(0, 0%, 0%, 0.741) 64.7%,
      hsla(0, 0%, 0%, 0.825) 71%,
      hsla(0, 0%, 0%, 0.896) 77.5%,
      hsla(0, 0%, 0%, 0.951) 84.5%,
      hsla(0, 0%, 0%, 0.987) 91.9%,
      hsl(0, 0%, 0%) 100%
    );
  }

  input {
    display: block;
    background: #1d1e20;
    padding: 1em 1.5em;
    border: 2px solid transparent;
    margin: auto;
    font: inherit;
    color: inherit;
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
    outline: none;
    border-radius: 9em;
  }

  input:focus {
    border-color: inherit;
  }

  .spacer {
    flex: 1;
  }
</style>

<div class="bar">
  <div class="spacer" />
  <input type="text" placeholder="Type something" />
</div>
