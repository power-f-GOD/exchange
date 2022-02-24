<script context="module">
  import { browser, dev } from '$app/env';
  import Card from '../components/shared/Card.svelte';

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
  import Text from '../components/shared/Text.svelte';
  import Input from '../components/shared/Input.svelte';
  import Stack from '../components/shared/Stack.svelte';
  import SVGIcon from '../components/shared/SVG.Icon.svelte';
</script>

<svelte:head>
  <title>Exchange</title>
</svelte:head>

<Stack as="section" class="grid place-items-center" gap="2em">
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

  <Stack class="sm:flex-row" columnGap="1em" rowGap="2em">
    <Stack as="section" class="anim__fadeInUp" gap="0.75em">
      <Card />

      <Text as="small" class="font-bold">USD: $ 42000.479901</Text>
    </Stack>

    <Stack as="section" gap="0.75em" class="anim__fadeInUp anim__del--025s">
      <Card />

      <Text as="small" class="font-bold">USD: $ 42000.479901</Text>
    </Stack>
  </Stack>
</Stack>
