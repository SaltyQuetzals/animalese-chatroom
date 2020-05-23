<script>
  import Tile from './Tile.svelte';
  import {connections} from './socket.js';
</script>

<style>
  .tiles {
    padding: 1em;
    text-align: center;
  }
</style>

<div class="tiles">
  {#each $connections as villager (villager.socketId)}
    <Tile
      name={villager.name}
      image={villager.file}
      speaking={villager.speaking} />
  {/each}
</div>
