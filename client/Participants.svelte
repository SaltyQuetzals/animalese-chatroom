<script>
  import { connections } from "./socket.js";
</script>

<style>
  .entry {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
  }

  .entry img {
    height: 1.2em;
    width: 1.2em;
    object-fit: cover;
    border-radius: 9em;
  }

  .entry > div {
    flex: 1;
    margin-left: 0.5em;
  }

  .participants {
    overflow: auto;
  }
</style>

<h2>Participants ({$connections.length})</h2>

<div class="participants">
  {#each $connections as villager}
    <div class="entry">
      <img
        src="villagers/{villager.name}.png"
        alt="Picture of {villager.name}" />
      <div>{villager.name}</div>
    </div>
  {/each}
</div>
