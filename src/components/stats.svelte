<script lang="ts">
  export let WPM: number;
  export let AWPM: number;
  export let accuracy: number;
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
</div>

<style>
  .stats__container {
    height: 50vh;
    color: white;
  }
</style>
