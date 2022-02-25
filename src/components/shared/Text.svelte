<script lang="ts">
  /** internal deps */
  import type { TextProps } from 'src/types';

  /** props */
  let _as = 'span';
  export let fontSize: string = undefined;
  export let color: string = undefined;
  export { _as as as };

  /** react-ibles */
  $: finalClassName = `Text ${$$restProps.class || ''}`.trim();
  $: finalStyle = `
    ${fontSize ? `font-size:${fontSize};` : ''}
    ${color ? `color:${color};` : ''}
    ${$$restProps.style || ''}
  `
    .trim()
    .replace(/\s+/g, ' ');
  $: style = finalStyle.length ? { style: finalStyle } : {}; // doing this to prevent empty style attribute from being added to element when no (extra) style (prop) is defined

  /** props type */
  type $$Props = TextProps;
</script>

{#if _as === 'small'}
  <small {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </small>
{:else if _as === 'strong'}
  <strong {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </strong>
{:else if _as === 'em'}
  <em {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </em>
{:else if _as === 'p'}
  <p {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </p>
{:else if _as === 'h1'}
  <h1 {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </h1>
{:else if _as === 'h2'}
  <h2 {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </h2>
{:else if _as === 'h3'}
  <h3 {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </h3>
{:else if _as === 'h4'}
  <h4 {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </h4>
{:else if _as === 'h5'}
  <h5 {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </h5>
{:else if _as === 'h6'}
  <h6 {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </h6>
{:else if _as === 'i'}
  <i {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </i>
{:else if _as === 'blockquote'}
  <blockquote {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </blockquote>
{:else if _as === 'address'}
  <address {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </address>
{:else if _as === 'div'}
  <div {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </div>
{:else}
  <span {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </span>
{/if}
