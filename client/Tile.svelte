<script>
  export let name;
</script>

<style>
  .tile {
    background: #232323;
    display: inline-block;
    width: 100%;
    max-width: 300px;
    position: relative;
    margin: 0 1em 1em 0;
  }

  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .filler {
    height: 0;
    padding-top: 56.25%;
  }
</style>

<div class="tile">
  <div class="name">{name}</div>
  <div class="filler" />
</div>
