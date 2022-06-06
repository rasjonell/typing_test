<script lang="ts">
  import { onMount } from "svelte";

  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);

  export let WPM: number;
  export let AWPM: number;
  export let accuracy: number;

  let chartValues = [45];
  let chartLabels = ["06/07 23:20"];
  let ctx: CanvasRenderingContext2D;
  let chartCanvas: HTMLCanvasElement;

  onMount(() => {
    ctx = chartCanvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "WPM",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: chartValues,
          },
          {
            label: "AWPM",
            backgroundColor: "rgb(99, 255, 132)",
            borderColor: "rgb(99, 255, 132)",
            data: [30],
          },
        ],
      },
    });
  });
</script>

<div class="stats__container">
  <h1>Results</h1>
  <div>
    <span>WPM</span>/<span>AWPM</span>
    <span>{WPM}/{AWPM}</span> Words Per Minute
  </div>
  <div>
    <span>{accuracy}%</span> Accuracy
  </div>
  <canvas bind:this={chartCanvas} />
  <div class="stats__actions">
    <button on:click={() => location.reload()}>Retake the Test!</button>
    <button>Share Your Results!</button>
  </div>
</div>

<style>
  .stats__container {
    height: 50vh;
    color: white;
  }

  button {
    margin-right: 5px;
    cursor: pointer;
  }

  .stats__actions {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: flex-end;
  }
</style>
