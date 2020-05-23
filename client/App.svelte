<script>
  import Tiles from "./Tiles.svelte";
  import Participants from "./Participants.svelte";
  import Chat from "./Chat.svelte";
</script>

<style>
  .wrap {
    display: flex;
    height: 100%;
  }

  .grid {
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
  }

  .sidebar > div + div {
    border-top: 1px solid #3d3d42;
  }

  .participants {
    flex: 1;
  }
</style>

<div class="wrap">
  <div class="grid">
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
