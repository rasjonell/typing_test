<script lang="ts">
  import Typer from "./components/typer.svelte";
  import Keyboard from "./components/keyboard.svelte";
</script>

<main>
  <Typer />
  <Keyboard />
</main>

<style>
  main {
    height: 100%;
    display: flex;
    user-select: none;
    font-family: Arial;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;

    /* Disable selection */
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
</style>
