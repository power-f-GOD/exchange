<script lang="ts">
  /** external deps */
  import { createEventDispatcher } from 'svelte';

  /** internal deps */
  import type { IconButtonProps, SVGIconName } from 'src/types';
  import SVGIcon from './SVG.Icon.svelte';

  /** props */
  export let variant: IconButtonProps['variant'];
  export let size: IconButtonProps['size'];
  export let icon: SVGIconName;

  /** funcs */
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click');
  };

  /** props type */
  type $$Props = IconButtonProps;
</script>

<button
  {...$$restProps}
  on:click={handleClick}
  class={`IconButton variant--${variant || 'icon'} size--${size || 'medium'} ${
    $$restProps.class || ''
  }`.trim()}>
  <SVGIcon name={icon} />
</button>
