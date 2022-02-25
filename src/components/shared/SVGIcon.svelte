<script lang="ts">
  /** internal deps */
  import type { SVGIconName, SVGIconProps } from 'src/types';
  import Text from './Text.svelte';

  /** props */
  export let name: SVGIconName;
  export let size: string | number = '';
  export let color = '';

  /** react-ibles */
  $: _size = +size ? `${size}px` : size;
  $: finalStyle = `
    ${size ? `height: ${_size};` : ''}
    ${size ? `width: ${_size};` : ''}
    ${color ? `color: ${color};` : ''}`
    .trim()
    .replace(/\s+/g, ' ');
  $: style = finalStyle.length ? { style: finalStyle } : {}; // doing this to prevent empty style attribute from being added to element when no (extra) style is defined

  /** props type */
  type $$Props = SVGIconProps;
</script>

<Text as="i" class={`SVGIcon ${$$restProps.class || ''}`.trim()} {...style}>
  {#if name === 'search'}
    <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_64_3644"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H19.4768V19.477H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_64_3644)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.739 1.5C5.196 1.5 1.5 5.195 1.5 9.738C1.5 14.281 5.196 17.977 9.739 17.977C14.281 17.977 17.977 14.281 17.977 9.738C17.977 5.195 14.281 1.5 9.739 1.5M9.739 19.477C4.369 19.477 0 15.108 0 9.738C0 4.368 4.369 0 9.739 0C15.109 0 19.477 4.368 19.477 9.738C19.477 15.108 15.109 19.477 9.739 19.477"
          fill="#00004C" />
      </g>
      <mask
        id="mask1_64_3644"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="15"
        y="15"
        width="6"
        height="6">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.2402 15.707H20.2643V20.7218H15.2402V15.707Z"
          fill="white" />
      </mask>
      <g mask="url(#mask1_64_3644)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.5145 20.7218C19.3235 20.7218 19.1315 20.6488 18.9845 20.5028L15.4605 16.9888C15.1675 16.6958 15.1665 16.2208 15.4595 15.9278C15.7515 15.6328 16.2265 15.6348 16.5205 15.9258L20.0445 19.4408C20.3375 19.7338 20.3385 20.2078 20.0455 20.5008C19.8995 20.6488 19.7065 20.7218 19.5145 20.7218"
          fill="#00004C" />
      </g>
    </svg>
  {:else if name === 'spinner'}
    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <line
        x1="128"
        y1="32"
        x2="128"
        y2="64"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="195.9"
        y1="60.1"
        x2="173.3"
        y2="82.7"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="224"
        y1="128"
        x2="192"
        y2="128"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="195.9"
        y1="195.9"
        x2="173.3"
        y2="173.3"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="128"
        y1="224"
        x2="128"
        y2="192"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="60.1"
        y1="195.9"
        x2="82.7"
        y2="173.3"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="32"
        y1="128"
        x2="64"
        y2="128"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
      <line
        x1="60.1"
        y1="60.1"
        x2="82.7"
        y2="82.7"
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16" />
    </svg>
  {:else if name === 'caret'}
    <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M-1.03252e-06 0.901889C-1.05262e-06 1.13176 0.0864638 1.36284 0.259394 1.53855L4.36943 5.73523C4.53644 5.90492 4.76267 6 4.99955 6C5.23526 6 5.46149 5.90492 5.6285 5.73523L9.7409 1.53855C10.0868 1.18592 10.0868 0.615452 9.73853 0.26282C9.3903 -0.0886075 8.82769 -0.087404 8.48183 0.265227L4.99955 3.81922L1.51728 0.265227C1.17142 -0.0874047 0.609991 -0.0886082 0.261764 0.26282C0.0864648 0.438533 -1.01232e-06 0.670813 -1.03252e-06 0.901889Z"
        fill="#23244B" />
    </svg>
  {/if}
</Text>
