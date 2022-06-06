<script lang="ts">
  // Core
  import { tweened } from "svelte/motion";
  import { onMount, tick, onDestroy, getContext } from "svelte";

  // Components
  import Stats from "./stats.svelte";
  import ProgressBar from "@okrad/svelte-progressbar";

  // Helpers
  import { activeKey } from "../stores/keyboard";
  import * as WPMCalculator from "../utils/wpm_calculator";
  import attachRandomParagraph from "../utils/random_paragraph";

  export let input: HTMLInputElement;

  let value = "";
  let paragraph: string;
  let panel: HTMLElement;
  let currentTextId = "1";
  let text: HTMLSpanElement[];
  let currentElement: HTMLSpanElement;

  let originalTime = 60;
  let timer = tweened(originalTime);
  let interval: NodeJS.Timer = null;

  const { open } = getContext("simple-modal");

  function reassignCurrentElement(restart = false) {
    const words = value.split(" ");

    currentElement.classList.remove("panel__active-word");
    currentTextId = words.length.toString();
    currentElement = document.getElementById(currentTextId);
    currentElement.classList.add("panel__active-word");

    if (restart) currentElement.scrollIntoView({ behavior: "smooth" });
  }

  function initiateTimer() {
    interval = setInterval(() => {
      if ($timer > 0) $timer--;
      else {
        const results = WPMCalculator.getResults(paragraph, value);

        /* Cleanup */
        $timer = originalTime;
        clearInterval(interval);
        interval = null;
        value = "";
        reassignCurrentElement(true);

        open(Stats, results);
      }
    }, 1000);
  }

  function handleKeyUp({ key }: KeyboardEvent): void {
    if (value.length === 1 && !interval) initiateTimer();
    const firstChild = panel.firstChild as HTMLElement;

    value = value.replace(/\s\s+/g, " ");
    const words = value.split(" ");

    reassignCurrentElement();

    const nextElement =
      words.length < 3
        ? firstChild
        : document.getElementById((+currentTextId + 2).toString());

    // TODO: `nextElement` is null when reaching the end of the text
    nextElement.scrollIntoView({ behavior: "smooth" });
  }

  async function handleKeyDown({ key }: KeyboardEvent): Promise<void> {
    $activeKey = key;
    await tick();
    $activeKey = null;
  }

  onMount(async () => {
    const { paragraph: par, htmlText } = await attachRandomParagraph(panel);
    paragraph = par;
    text = htmlText;

    currentElement = document.getElementById(currentTextId);
    currentElement.classList.add("panel__active-word");
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
</script>

<div class="typer__container">
  <div bind:this={panel} class="typer__panel">
    {#if !text}
      Getting a test paragraph...
    {/if}
  </div>
  <ProgressBar
    style="thin"
    labelColor="#ee786e"
    showProgressValue={false}
    width={input ? input.offsetWidth : 710}
    series={((originalTime - $timer) * 100) / originalTime}
  />
  <div class="typer__input-container">
    <input
      bind:value
      type="text"
      disabled={!text}
      bind:this={input}
      on:keyup={handleKeyUp}
      on:keydown={handleKeyDown}
      placeholder="Start Typing To Start The Test"
    />
    <span class="typer__time-left">{Math.round($timer)}s</span>
  </div>
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

  .typer__input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .typer__time-left {
    height: 50px;
    color: white;
    font-weight: bold;
    font-size: xx-large;
    transition: content 100ms linear;
    text-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  }

  input {
    width: 90%;
    height: 50px;
    border: none;
    color: white;
    font-weight: bold;
    font-size: larger;
    text-align: center;
    border-radius: 0 0 10px 10px;
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
