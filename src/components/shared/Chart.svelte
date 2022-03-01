<!-- 
  Chart sample pulled from Svelte's Area Chart sample @ https://svelte.dev/examples/area-chart 
-->
<script lang="ts">
  /** internal deps */
  import { AN_HOUR_IN_MS, A_DAY_IN_MS } from '../../constants';
  import type { StreamResponseData } from '../../types';

  /** props */
  export let width = 240;
  export let height = 55;
  export let data: Partial<StreamResponseData>[] = [];

  /** vars */
  const samplePoints: Partial<StreamResponseData>[] = [
    { h: '20', l: '0', a: '7', o: '10', O: 0, C: 86400000, E: 86400000 },
    { h: '20', l: '0', a: '2', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 2 },
    { h: '20', l: '0', a: '4', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 4 },
    { h: '20', l: '0', a: '8', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 6 },
    { h: '20', l: '0', a: '6', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 8 },
    { h: '20', l: '0', a: '19', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 10 },
    { h: '20', l: '0', a: '7', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 12 },
    { h: '20', l: '0', a: '11', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 14 },
    { h: '20', l: '0', a: '9', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 16 },
    { h: '20', l: '0', a: '19', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 18 },
    { h: '20', l: '0', a: '13', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 20 },
    { h: '20', l: '10', a: '20', o: '10', O: 0, C: 86400000, E: 86400000 + AN_HOUR_IN_MS * 24 }
  ];

  /** react-ibles */
  $: points = data.length ? data : samplePoints;
  $: firstTick = points[0];
  $: lastTick = points?.slice(-1)[0];
  $: maxX = +firstTick.C! / AN_HOUR_IN_MS;
  $: path = `M0,${+Math.abs(height - (+firstTick.o! / +firstTick.h!) * height).toFixed(2)}L${points
    .map((ticker) => {
      const x =
        +Math.abs((ticker.E! - A_DAY_IN_MS) / AN_HOUR_IN_MS / maxX).toFixed(2) *
        (!firstTick.s ? width : 1);
      const y = +Math.abs(height - (+ticker.a! / +ticker.h!) * height).toFixed(2);

      return `${x},${y}`;
    })
    .join('L')}`;
  $: area = `${path},L${width},${height}L0,${height}Z`;
  $: percentageNegative = lastTick?.P?.includes('-');
</script>

<svg
  style="width:{width}px; height:{height}px"
  class="max-w-full max-h-full overflfow-auto relative">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="5%" stop-color="white" />
      <stop
        offset="90%"
        stop-color={!lastTick.s
          ? 'rgba(200, 200, 200, 0.05)'
          : `${!percentageNegative ? 'rgb(38, 226, 156, 0.15)' : 'rgba(245, 89, 89, 0.15)'}`} />
    </linearGradient>
  </defs>
  <!-- data -->
  <path d={area} fill="url(#gradient)" />
  <path
    class="path-line"
    d={path}
    style={`stroke: ${
      !lastTick.s ? 'rgba(0, 0, 0, 0.075)' : percentageNegative ? '#F55959' : '#26E29C'
    }`} />
</svg>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 0.125em;
  }
</style>
