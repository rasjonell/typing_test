<script lang="ts">
  // Core
  import { onMount } from "svelte";

  // Helpers
  import setupChart from "../utils/chart";
  import { appendResults } from "../utils/chart_data";

  export let WPM: number;
  export let AWPM: number;
  export let accuracy: number;

  let chartCanvas: HTMLCanvasElement;

  onMount(() => {
    setupChart(chartCanvas, appendResults(WPM, AWPM));
  });
</script>

<div class="stats__container">
  <div class="stats__widgets">
    <div>
      <div class="ui-widget">
        <h1 class="ui-value">{WPM}</h1>
        <span class="ui-label">WPM</span>
      </div>
    </div>
    <div>
      <div class="ui-widget">
        <h1 class="ui-value">{accuracy}%</h1>
        <span class="ui-label">Accuracy</span>
      </div>
    </div>
    <div>
      <div class="ui-widget">
        <h1 class="ui-value">{AWPM}</h1>
        <span class="ui-label">AWPM</span>
      </div>
    </div>
  </div>
  <canvas bind:this={chartCanvas} />
  <div class="stats__actions">
    <button
      class="btn-grad"
      on:click={() =>
        window.open(
          `https://twitter.com/intent/tweet?text=I can type ${AWPM} Accurate Words Per Minute. Can you beat my record?`
        )}
    >
      Tweet Your Results!
    </button>
    <button class="btn-grad" on:click={() => location.reload()}>
      Retake the Test!
    </button>
  </div>
</div>

<style>
  .stats__container {
    height: 75vh;
    color: white;
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    justify-content: space-between;
  }

  button {
    margin-right: 5px;
    cursor: pointer;
  }

  .stats__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stats__widgets {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ui-widget {
    position: relative;
    display: inline-block;
    width: 160px;
    height: 160px;
    margin: 10px;
    border: 15px solid #00aeef;
    border-radius: 150px;
    text-align: center;
    font-family: Arial, sans-serif;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8),
      inset 0 3px 5px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    border-bottom-color: #fff;
  }

  .ui-widget .ui-value {
    position: absolute;
    left: 0;
    right: 0;
    top: 15px;
    font-size: 40px;
  }

  .ui-label {
    position: absolute;
    left: 0;
    bottom: -40px;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    font-weight: 700;
  }

  .btn-grad {
    background-image: linear-gradient(
      to right,
      #aa076b 0%,
      #61045f 51%,
      #aa076b 100%
    );
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    border-radius: 10px;
    display: block;
    border: none;
  }

  .btn-grad:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
</style>
