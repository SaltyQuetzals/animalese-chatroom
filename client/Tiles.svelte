<script>
  import Tile from "./Tile.svelte";
  import { villagerNames } from "./villagers.js";

  const names = Array.from(Array(100)).map(e => {
    const name =
      villagerNames[Math.floor(Math.random() * villagerNames.length)];
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
</script>

<style>
  .tiles {
    padding: 1em;
    text-align: center;
  }
</style>

<div class="tiles">
  {#each names as name}
    <Tile {name} />
  {/each}
</div>
