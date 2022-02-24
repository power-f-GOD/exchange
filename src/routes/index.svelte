<script context="module">
  import { browser, dev } from '$app/env';

  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev;

  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser;

  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true;
</script>

<script lang="ts">
  /** internal deps */
  import Input from '../components/shared/Input.svelte';
  import Stack from '../components/shared/Stack.svelte';
  import SVGIcon from '../components/shared/SVG.Icon.svelte';
</script>

<svelte:head>
  <title>Exchange</title>
</svelte:head>

<Stack as="section">
  <Input
    placeholder="Search"
    kind="select"
    selectOptions={[
      { text: 'Option A', value: 'a' },
      { text: 'Option B', value: 'b' },
      { text: 'Option C', value: 'c' }
    ]}>
    <SVGIcon name="search" slot="start-adornment" size="1.25em" />
  </Input>
</Stack>
