<script>
  import Tile from "./Tile.svelte";
  import { villagers } from "../public/villagers/villagers.js";

  const people = Array.from(Array(100)).map(
    e => villagers[Math.floor(Math.random() * villagers.length)]
  );
</script>

<style>
  .tiles {
    padding: 1em;
    text-align: center;
  }
</style>

<div class="tiles">
  {#each people as villager}
    <Tile name={villager.name} image={villager.file} />
  {/each}
</div>
