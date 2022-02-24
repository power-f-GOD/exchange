<script lang="ts">
  /** internal deps */
  import Stack from '../shared/Stack.svelte';
  import Text from '../shared/Text.svelte';
  import Chart from './Chart.svelte';

  /** props */
  export let data: any[];
</script>

<Stack as="section" class="Card bg-white justify-between max-w-full">
  <Stack class="p-4 pb-0 w-full gap-0">
    <Text fontSize="0.875em" class="flex flex-row justify-between w-full">
      <Text>BTC/USDT</Text>
      <Text color="#26E29C">+0.73%</Text>
    </Text>

    <Text as="strong" fontSize="1.25em">9441.3881</Text>

    <Text as="small" class="font-bold">Volume: 28864.479901</Text>
  </Stack>

  <Chart points={data} />
</Stack>
