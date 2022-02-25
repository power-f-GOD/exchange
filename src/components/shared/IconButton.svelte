<script lang="ts">
  /** internal deps */
  import type { IconButtonProps, SVGIconName, SVGIconProps } from 'src/types';
  import SVGIcon from './SVGIcon.svelte';

  /** props */
  export let variant: IconButtonProps['variant'] = 'icon';
  export let size: IconButtonProps['size'];
  export let icon: SVGIconName;
  export let iconProps: Omit<SVGIconProps, 'name'>;

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
  <SVGIcon {...iconProps || {}} name={icon} />
</button>
