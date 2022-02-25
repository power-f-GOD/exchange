<script lang="ts">
  /** external deps */
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  /** internal deps */
  import type { InputProps } from 'src/types';
  import IconButton from './IconButton.svelte';
  import Stack from './Stack.svelte';
  import Text from './Text.svelte';
  import SVGIcon from './SVGIcon.svelte';

  /** props */
  export let containerProps: InputProps['containerProps'] = {};
  export let kind: InputProps['kind'] = 'regular';
  export let selectOptions: InputProps['selectOptions'] = [];
  export let label: string;
  export let isLoading = false;

  /** vars */
  let displayDropdown = false;
  let selectedOption: typeof selectOptions[0];
  let value = '';

  /** funcs */
  const dispatch = createEventDispatcher();

  const handleOnInput = (e) => {
    dispatch('input', { target: e.target, value: e.target.value });
    value = e.target.value.replace(/\(.+\)?/g, '');
    selectedOption = undefined;
    displayDropdown = true;
  };

  const handleOptionClick = (option: typeof selectOptions[0]) => () => {
    selectedOption = option;
    displayDropdown = false;

    if (option.action) {
      option.action();
    }
  };

  /** react-ibles */
  // eslint-disable-next-line
  $: if (globalThis.document) document.body.style.overflow = displayDropdown ? 'hidden' : 'unset';

  /** props type */
  type $$Props = InputProps;
</script>

<Stack
  {...containerProps}
  class={`Input relative gap-0 ${containerProps.class || ''}`.trim()}
  as="span">
  {#if label}
    <Text as="small" class="mb-1 opacity-40" fontSize="0.875em">{label}</Text>
  {/if}

  <Stack as="span" class="label-wrapper rounded relative flex-row items-center w-full">
    <Stack as="label" gap="0.75em" class="w-full flex-row h-full items-center">
      <slot name="start-adornment" />

      <input
        {...$$restProps}
        class={`${$$restProps.class || ''} h-full w-full bg-transparent`.trim()}
        value={selectedOption?.text || ''}
        on:input={handleOnInput}
        on:focus={() => {
          if (selectOptions.length) {
            displayDropdown = true;
          }
        }} />

      <slot name="end-adornment" />
    </Stack>

    {#if kind === 'select'}
      <IconButton
        icon={isLoading ? 'spinner' : 'caret'}
        slot="end-adornment"
        size="small"
        iconProps={{ size: isLoading ? '2em' : undefined, class: isLoading ? 'animate-spin' : '' }}
        disabled={isLoading}
        class={displayDropdown && selectOptions.length ? 'rotate-180 ' : ''}
        on:click={() => (displayDropdown = true)} />

      {#if displayDropdown && selectOptions.length}
        <ul
          class="Stack w-full bg-white absolute rounded z-[10001] py-2 px-0 top-[calc(100%+0.25em)] overflow-auto max-h-[50vh] m-0 -ml-4"
          transition:fly={{ y: 24, duration: 300 }}>
          {#each selectOptions as option (option.text)}
            <button role="listitem" on:click={handleOptionClick(option)}>
              {#if option.icon}
                <Stack as="span">
                  <img src={option.icon} alt="{option.text} flag" />
                </Stack>
              {:else if option.iconName}
                <SVGIcon name={option.iconName} />
              {/if}

              <Text as="span">
                {@html `${option.text.replace(new RegExp(value, 'i'), `<b>${value}</b>`)}`}
              </Text>
            </button>
          {/each}
        </ul>

        <div
          class="fixed top-0 left-0 h-full w-full z-[10000] bg-[rgba(0,0,0,0.05)]"
          on:click={() => (displayDropdown = false)}
          transition:fly={{ duration: 300, opacity: 0 }} />
      {/if}
    {/if}
  </Stack>
</Stack>
