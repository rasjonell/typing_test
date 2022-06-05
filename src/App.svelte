<script lang="ts">
  import Keyboard from "./components/keyboard.svelte";
</script>

<main>
  <Keyboard />
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
