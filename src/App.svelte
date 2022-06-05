<script lang="ts">
  import { tick } from "svelte";

  import Keyboard from "./components/keyboard.svelte";

  let value = "";
  let pressedKey: string = null;

  async function handleChange({ key }: KeyboardEvent): Promise<void> {
    pressedKey = key;
    await tick();
    pressedKey = null;
  }
</script>

<main>
  <input
    bind:value
    type="text"
    on:keydown={handleChange}
    placeholder="Type some shit..."
  />
  <Keyboard activeKey={pressedKey} />
</main>

<style>
  main {
    text-align: center;
    background-color: #ffffff;
    margin-top: 50px;
    font-family: Arial;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  input {
    width: 780px;
    border: none;
    font-size: large;
    text-align: center;
  }

  input:focus,
  input:active {
    outline: none;
  }
</style>
