<script lang="ts">
  /** internal deps */
  import type { IconButtonProps, SVGIconName } from 'src/types';
  import SVGIcon from './SVG.Icon.svelte';

  /** props */
  export let variant: IconButtonProps['variant'];
  export let size: IconButtonProps['size'];
  export let icon: SVGIconName;

  /** props type */
  type $$Props = IconButtonProps;
</script>

<button
  {...$$restProps}
  on:click
  class={`IconButton variant--${variant || 'icon'} size--${
    size || 'medium'
  } inline-grid bg-transparent place-items-center w-[2em] h-[2em] rounded-[0.75em] relative overflow-hidden ${
    $$restProps.class || ''
  }`.trim()}>
  <SVGIcon name={icon} />
</button>
