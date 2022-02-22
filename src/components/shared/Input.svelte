<script lang="ts">
  import type { InputProps } from 'src/types';
  import Stack from './Stack.svelte';

  export let containerProps: InputProps['containerProps'] = {};

  type $$Props = InputProps;
</script>

<Stack {...containerProps} class={`Input ${containerProps.class || ''}`.trim()} as="span" gap="1em">
  <Stack as="label" gap="0.75em">
    <slot name="start-adornment" />
    <input {...$$restProps} />
  </Stack>
  <slot name="end-adornment" />
</Stack>
