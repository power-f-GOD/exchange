<script lang="ts">
  import type { StackProps } from 'src/types';

  let _as = 'div';
  export let gap = '';
  export let columnGap = '';
  export let rowGap = '';
  export let columns = '';
  export let rows = '';
  export let height = '';
  export let width = '';
  $: finalClassName = `Stack ${$$restProps.class || ''}`.trim();
  $: finalStyle = `
    ${gap ? `gap:${gap};` : ''}
    ${columnGap ? `columnGap:${columnGap};` : ''}
    ${rowGap ? `rowGap:${rowGap};` : ''}
    ${columns ? `gridTemplateColumns:${columns};` : ''}
    ${rows ? `gridTemplateRows:${rows};` : ''}
    ${height ? `height:${height};` : ''}
    ${width ? `width:${width};` : ''}
    ${$$restProps.style || ''}
  `
    .trim()
    .replace(/\s+/g, ' ');
  $: style = finalStyle.length ? { style: finalStyle } : {}; // doing this to prevent empty style attribute from being added to element when no (extra) style is defined

  export { _as as as };

  type $$Props = StackProps;
</script>

{#if _as === 'section'}
  <section {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </section>
{:else if _as === 'main'}
  <main {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </main>
{:else if _as === 'header'}
  <header {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </header>
{:else if _as === 'nav'}
  <nav {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </nav>
{:else if _as === 'footer'}
  <footer {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </footer>
{:else if _as === 'ul'}
  <ul {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </ul>
{:else if _as === 'ol'}
  <ol {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </ol>
{:else if _as === 'li'}
  <li {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </li>
{:else if _as === 'p'}
  <p {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </p>
{:else if _as === 'form'}
  <form {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </form>
{:else if _as === 'label'}
  <label for={$$restProps.for} {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </label>
{:else if _as === 'aside'}
  <aside {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </aside>
{:else if _as === 'span'}
  <span {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </span>
{:else}
  <div {...$$restProps} class={finalClassName} {...style}>
    <slot />
  </div>
{/if}
