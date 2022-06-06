<script lang="ts">
  import { onMount, tick } from "svelte";
  import { activeKey } from "../stores/keyboard";

  let value = "";
  let input: HTMLElement;
  let panel: HTMLElement;
  let text: HTMLSpanElement[];
  let currentTextId = "1";
  let currentElement: HTMLSpanElement;

  function handleKeyUp({ key }: KeyboardEvent): void {
    const firstChild = panel.firstChild as HTMLElement;

    value = value.replace(/\s\s+/g, " ");
    const words = value.split(" ");

    currentElement.classList.remove("panel__active-word");
    currentTextId = words.length.toString();
    currentElement = document.getElementById(currentTextId);
    currentElement.classList.add("panel__active-word");

    const nextElement =
      words.length < 3
        ? firstChild
        : document.getElementById((+currentTextId + 2).toString());

    // TODO: `nextElement` is null when reaching the end of the text
    nextElement.scrollIntoView({ behavior: "smooth" });
  }

  async function handleKeyDown({ key }: KeyboardEvent): Promise<void> {
    $activeKey = key; await tick();
    $activeKey = null;
  }

  onMount(async () => {
    input.focus();

    const response = await fetch("http://metaphorpsum.com/sentences/10");
    const paragraph = await response.text();

    text = paragraph.split(" ").map((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.setAttribute("id", (index + 1).toString());
      span.classList.add("panel__word");
      return span;
    });

    for (const child of text) {
      panel.appendChild(child);
      const whitespace = document.createElement("span");
      whitespace.textContent = " ";
      panel.appendChild(whitespace);
    }

    currentElement = document.getElementById(currentTextId);
    currentElement.classList.add("panel__active-word");
  });
</script>

<div class="typer__container">
  <div bind:this={panel} class="typer__panel">
    {#if !text}
      Getting a test paragraph...
    {/if}
  </div>

  <input
    bind:value
    type="text"
    disabled={!text}
    bind:this={input}
    on:keyup={handleKeyUp}
    on:keydown={handleKeyDown}
    placeholder="Start Typing To Start The Test"
  />
</div>

<style>
  .typer__container {
    width: 789px;
    display: flex;
    flex-direction: column;
  }

  .typer__panel {
    height: 10vh;
    color: white;
    padding: 0 50px;
    overflow: hidden;
    line-height: 10vh;
    font-weight: bold;
    font-size: xx-large;
    margin-bottom: 20px;
    border-radius: 10px;
    white-space: nowrap;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  :global(.panel__word) {
    transition: background-color 500ms linear;
  }

  :global(.panel__active-word) {
    padding: 10px;
    border-radius: 10px;
    color: var(--off-white);
    background-color: var(--peach);
    text-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  }

  input {
    width: 100%;
    height: 50px;
    border: none;
    color: white;
    font-weight: bold;
    font-size: larger;
    text-align: center;
    border-radius: 10px;
    transition: background-color 500ms linear;
    background-color: rgba(255, 255, 255, 0.025);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  input:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  input:focus,
  input:active {
    outline: none;
    background-color: rgba(255, 255, 255, 0.075);
  }
</style>
