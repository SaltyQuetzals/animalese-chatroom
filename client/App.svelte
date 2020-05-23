<script>
  import Tiles from "./Tiles.svelte";
  import Participants from "./Participants.svelte";
  import Chat from "./Chat.svelte";
  import { synthesizeText } from "./synthesizeText.js";

  let unsupported = false;

  synthesizeText(".", () => (unsupported = true));
</script>

<style>
  .wrap {
    display: flex;
    height: 100%;
  }

  .main {
    flex: 1;
    overflow-y: auto;
    height: 100%;
  }

  .sidebar {
    width: 300px;
    background: #242424;
    border-left: 1px solid #3d3d42;
    display: flex;
    flex-direction: column;
  }

  .sidebar > div {
    padding: 1em;
    overflow: auto;
  }

  .sidebar > div + div {
    border-top: 1px solid #3d3d42;
  }

  .participants {
    flex: 1;
  }

  .error {
    padding: 1em;
    text-align: center;
    background: darkred;
  }
</style>

<div class="wrap">
  <div class="main">
    {#if unsupported}
      <div class="error">
        Your browser does not support features required for this site. Please
        use Firefox or Chrome.
      </div>
    {/if}
    <Tiles />
  </div>

  <div class="sidebar">
    <div class="participants">
      <Participants />
    </div>
    <div>
      <Chat />
    </div>
  </div>
</div>
