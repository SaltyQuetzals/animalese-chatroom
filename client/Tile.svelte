<script>
  export let name, image;
</script>

<style>
  .tile {
    display: inline-block;
    width: 100%;
    max-width: 300px;
    position: relative;
    margin: 0 1em 1em 0;
    background-color: #232323;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .name {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0.8em;
    padding: 0.5em;
    background: rgba(0, 0, 0, 0.5);
  }

  .filler {
    height: 0;
    padding-top: 56.25%;
  }
</style>

<div class="tile" style="background-image: url(villagers/{image}.png)">
  <div class="name">{name}</div>
  <div class="filler" />
</div>
