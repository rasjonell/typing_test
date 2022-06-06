<script lang="ts">
  // Core
  import { scale } from "svelte/transition";

  // Components
  import Modal from "svelte-simple-modal";
  import Typer from "./components/typer.svelte";
  import Keyboard from "./components/keyboard.svelte";


  let input: HTMLInputElement;

  function handleModalOpen() {
    input.disabled = true;
  }

  function handleModalClosed() {
    input.disabled = false;
  }
</script>

<Modal
  closeButton={false}
  transitionWindow={scale}
  classWindow="modal__background"
  on:open={handleModalOpen}
  on:closed={handleModalClosed}
>
  <main>
    <Typer bind:input />
    <Keyboard />
  </main>
</Modal>

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

  :global(.modal__background) {
    background-color: #4158d0 !important;
    background-image: linear-gradient(
      135deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    ) !important;
  }
</style>
