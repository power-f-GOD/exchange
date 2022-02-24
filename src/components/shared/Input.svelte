<script lang="ts">
  /** external deps */
  import { fly } from 'svelte/transition';

  /** internal deps */
  import type { InputProps } from 'src/types';
  import IconButton from './IconButton.svelte';
  import Stack from './Stack.svelte';

  /** props */
  export let containerProps: InputProps['containerProps'] = {};
  export let kind: InputProps['kind'] = 'regular';
  export let selectOptions: InputProps['selectOptions'] = [];

  /** vars */
  let displayDropdown = false;
  let selectedOption: typeof selectOptions[0];

  /** funcs */
  const handleOnInput = () => {
    selectedOption = undefined;
  };

  const handleOptionClick = (option: typeof selectOptions[0]) => () => {
    selectedOption = option;
    displayDropdown = false;
  };

  /** react-ibles */
  // eslint-disable-next-line
  $: if (globalThis.document) document.body.style.overflow = displayDropdown ? 'hidden' : 'unset';

  /** props type */
  type $$Props = InputProps;
</script>

<Stack {...containerProps} class={`Input ${containerProps.class || ''}`.trim()} as="span" gap="1em">
  <Stack as="label" gap="0.75em">
    <slot name="start-adornment" />

    <input
      {...$$restProps}
      value={selectedOption?.text || ''}
      on:input={handleOnInput}
      on:focus={() => (displayDropdown = true)} />

    <slot name="end-adornment" />
  </Stack>

  {#if kind === 'select'}
    <IconButton
      icon="caret"
      slot="end-adornment"
      size="small"
      class={displayDropdown ? 'rotate-180' : ''}
      on:click={() => (displayDropdown = true)} />

    {#if displayDropdown}
      <ul class="Stack" transition:fly={{ y: 24, duration: 300 }}>
        {#each selectOptions as option (option.text)}
          <button role="listitem" on:click={handleOptionClick(option)}>
            {option.text}
          </button>
        {:else}
          <button role="listitem">- No options -</button>
        {/each}
      </ul>

      <div
        class="overlay"
        on:click={() => (displayDropdown = false)}
        transition:fly={{ duration: 300, opacity: 0 }} />
    {/if}
  {/if}
</Stack>
