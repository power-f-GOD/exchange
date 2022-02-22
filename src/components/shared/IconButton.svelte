<script lang="ts">
  import type { IconButtonProps, SVGIconName } from 'src/types';
  import SVGIcon from './SVG.Icon.svelte';

  export let variant: IconButtonProps['variant'];
  export let size: IconButtonProps['size'];
  export let icon: SVGIconName;
  // export let color = '';

  type $$Props = IconButtonProps;
</script>

<button
  {...$$restProps}
  class={`IconButton variant-${variant || 'icon'} size-${size || 'medium'} ${
    $$restProps.class || ''
  }`.trim()}>
  <SVGIcon name={icon} />
</button>
