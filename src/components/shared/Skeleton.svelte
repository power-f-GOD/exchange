<script lang="ts">
  import type { SkeletonProps } from 'src/types';

  /** internal deps */
  import Stack from './Stack.svelte';

  /** props */
  export let variant: 'grey' | 'white' = 'grey';
  export let loading = true;

  /** props type */
  type $$Props = SkeletonProps;
</script>

<Stack
  as="span"
  class={`Skeleton ${$$restProps.class || ''} ${variant} ${loading ? 'loading' : ''}`.replace(
    /\s+/g,
    ' '
  )} />
