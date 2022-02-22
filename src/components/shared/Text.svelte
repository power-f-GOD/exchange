<script lang="ts">
  import type { TextProps } from 'src/types';

  let _as = 'span';
  $: finalClassName = `Text ${$$restProps.class || ''}`.trim();

  export { _as as as };

  type $$Props = TextProps;
</script>

{#if _as === 'small'}
  <small {...$$restProps} class={finalClassName}>
    <slot />
  </small>
{:else if _as === 'strong'}
  <strong {...$$restProps} class={finalClassName}>
    <slot />
  </strong>
{:else if _as === 'em'}
  <em {...$$restProps} class={finalClassName}>
    <slot />
  </em>
{:else if _as === 'p'}
  <p {...$$restProps} class={finalClassName}>
    <slot />
  </p>
{:else if _as === 'h1'}
  <h1 {...$$restProps} class={finalClassName}>
    <slot />
  </h1>
{:else if _as === 'h2'}
  <h2 {...$$restProps} class={finalClassName}>
    <slot />
  </h2>
{:else if _as === 'h3'}
  <h3 {...$$restProps} class={finalClassName}>
    <slot />
  </h3>
{:else if _as === 'h4'}
  <h4 {...$$restProps} class={finalClassName}>
    <slot />
  </h4>
{:else if _as === 'h5'}
  <h5 {...$$restProps} class={finalClassName}>
    <slot />
  </h5>
{:else if _as === 'h6'}
  <h6 {...$$restProps} class={finalClassName}>
    <slot />
  </h6>
{:else if _as === 'i'}
  <i {...$$restProps} class={finalClassName}>
    <slot />
  </i>
{:else if _as === 'blockquote'}
  <blockquote {...$$restProps} class={finalClassName}>
    <slot />
  </blockquote>
{:else if _as === 'address'}
  <address {...$$restProps} class={finalClassName}>
    <slot />
  </address>
{:else if _as === 'div'}
  <div {...$$restProps} class={finalClassName}>
    <slot />
  </div>
{:else}
  <span {...$$restProps} class={finalClassName}>
    <slot />
  </span>
{/if}
