<!-- 
  Chart sample pulled from Svelte's Area Chart sample @ https://svelte.dev/examples/area-chart 
-->
<script lang="ts">
  /** internal deps */
  import { A_DAY_IN_MS, A_SEC_IN_MS } from '../../constants';
  import type { StreamResponseData } from '../../types';
  import { samplePoints } from '../../socket';
  import Stack from './Stack.svelte';

  /** props */
  export let width = 240;
  export let height = 55;
  export let data: Partial<StreamResponseData>[] = [];

  /** vars */
  let visContainer: HTMLElement | null;

  /** react-ibles */
  $: points = data.length ? data : samplePoints;
  $: firstTick = points[0];
  $: lastTick = points.slice(-1)[0];
  $: maxX = (+firstTick.C! - +firstTick.O!) / A_SEC_IN_MS;
  $: maxY = +(+firstTick.h! - +firstTick.l!).toFixed(2);
  $: computeX = (ticker: Partial<StreamResponseData>) =>
    +Math.abs((ticker.E! - firstTick.O! - A_DAY_IN_MS) / A_SEC_IN_MS).toFixed(2);
  $: computeY = (ticker: Partial<StreamResponseData>) =>
    +Math.abs(((+maxY - (+ticker.a! - +firstTick.l!)) / maxY) * height).toFixed(1);
  $: path = `M${computeX(firstTick)},${computeY(firstTick)}L${points
    .map((ticker, i) => {
      let x = computeX(ticker);
      let y = computeY(ticker);

      // i.e. if is sample (dummy) points
      if (!firstTick.s) {
        x = (x / maxX) * 240;
      }

      // reset graph width to lastTick's computed x value (for a case where it would eventually outgrow its container)
      if (i === points.length - 1) {
        width = x;
      }

      return `${x},${y}`;
    })
    .join('L')}`;
  $: area = `${path},L${+Math.abs((lastTick.E! - firstTick.O! - A_DAY_IN_MS) / A_SEC_IN_MS).toFixed(
    2
  )},${height}L0,${height}Z`;
  $: percentageNegative = lastTick?.P?.includes('-');
  $: if (lastTick) {
    if (!visContainer) {
      visContainer = document.querySelector(`#${lastTick.s}-vis-container`);
    }

    if (visContainer) {
      const { scrollLeft, scrollWidth, offsetWidth } = visContainer;

      // i.e. scroll auto'ly if user didn't scroll to beginning or position (24px) away from the tail end of graph in a case where the graph (path) outgrows its container
      if (scrollWidth - (scrollLeft + offsetWidth) <= 24) {
        visContainer.scrollLeft = scrollWidth + 24;
      }
    }
  }
</script>

<Stack class="overflow-auto w-full" id="{lastTick.s}-vis-container">
  <svg
    style="width:{width}px;height:{height}px"
    class="max-h-full overflow-visible relative max-w-ful">
    <defs>
      <linearGradient id={lastTick.s} gradientTransform="rotate(80)">
        <stop
          offset="0%"
          stop-color={!lastTick.s
            ? 'rgba(200, 200, 200, 0.05)'
            : `${
                !percentageNegative ? 'rgba(38, 226, 156, 0.125)' : 'rgba(245, 89, 89, 0.125)'
              }`} />
        <stop offset="100%" stop-color="white" />
      </linearGradient>
    </defs>
    <!-- data -->
    <path class="area" d={area} fill="url(#{lastTick.s})" />
    <path
      class="path-line"
      d={path}
      style={`stroke: ${
        !lastTick.s ? 'rgba(0, 0, 0, 0.075)' : percentageNegative ? '#F55959' : '#26E29C'
      }`} />
  </svg>
</Stack>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 0.125em;
  }
</style>
