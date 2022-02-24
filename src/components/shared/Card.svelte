<script lang="ts">
  /** interal deps */
  import Stack from './Stack.svelte';
  import Text from './Text.svelte';
</script>

<Stack as="section" class="Card">
  <Stack class="p-4 w-full" gap="0">
    <Text fontSize="0.875em" class="flex flex-row justify-between w-full">
      <Text>BTC/USDT</Text>
      <Text color="#26E29C">+0.73%</Text>
    </Text>

    <Text as="strong" fontSize="1.25em">9441.3881</Text>

    <Text as="small" class="font-bold">Volume: 28864.479901</Text>
  </Stack>
</Stack>
