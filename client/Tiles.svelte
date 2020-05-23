<script>
  import Tile from "./Tile.svelte";
  import { connections } from "./socket.js";
</script>

<style>
  .tiles {
    padding: 1em;
    text-align: center;
  }
</style>

<div class="tiles">
  {#each $connections as villager}
    <Tile name={villager.name} image={villager.file} />
  {/each}
</div>
