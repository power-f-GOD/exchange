<script lang="ts">
  import { addCommasToNumber } from '$lib';
  import type { StreamResponseData } from 'src/types';

  /** internal deps */
  import Stack from '../shared/Stack.svelte';
  import Text from '../shared/Text.svelte';
  import Chart from './Chart.svelte';
  import Skeleton from './Skeleton.svelte';

  /** props */
  export let data: StreamResponseData[];

  /** react-ibles */
  $: lastTick = data.slice(-1)[0];
</script>

<Stack as="section" class="Card bg-white justify-between max-w-full">
  <Stack class="p-4 pb-0 w-full gap-[0.5em] lh-1">
    <Text fontSize="0.875em" class="flex flex-row justify-between w-full">
      <Text class="w-2/5 pr-3">
        {#if lastTick}
          {lastTick.s.slice(0, 3)}/{lastTick.s.slice(3)}
        {:else}
          <Skeleton />
        {/if}
      </Text>
      <Text class="w-full max-w-[25%]" color={lastTick?.P.includes('-') ? '#F55959' : '#26E29C'}>
        {#if lastTick}
          {lastTick.P}%
        {:else}
          <Skeleton />
        {/if}
      </Text>
    </Text>

    <Text as="strong" class="w-2/4" fontSize="1.25em">
      {#if lastTick}
        {lastTick.Q}
      {:else}
        <Skeleton />
      {/if}
    </Text>

    <Text as="small" class="font-bold w-full">
      {#if lastTick}
        Volume: {addCommasToNumber(+lastTick.v)}
      {:else}
        <Skeleton class="w-4/5" />
      {/if}
    </Text>
  </Stack>

  <Chart {data} />
</Stack>
