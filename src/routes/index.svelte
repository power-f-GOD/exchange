<script lang="ts" context="module">
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
  /** external deps */
  import type { io } from 'socket.io-client';
  import { onMount } from 'svelte';

  /** internal deps */
  import { countriesQuery } from '$lib';
  import { globalSocket, initSocket } from '../socket';
  import type { Country } from 'src/types';
  import Text from '../components/shared/Text.svelte';
  import Input from '../components/shared/Input.svelte';
  import Stack from '../components/shared/Stack.svelte';
  import SVGIcon from '../components/shared/SVGIcon.svelte';
  import Card from '../components/shared/Card.svelte';

  /** vars */
  let data: any;
  let inputTimeout: any;
  let value = '';
  let isFetchingCountries = false;
  let countriesResult: Country[] = [];
  let socket: ReturnType<typeof io>;

  /** funcs */
  const handleOnInput = (e: any) => {
    clearTimeout(inputTimeout);
    value = e.detail.value;

    if (!value.trim()) {
      return (countriesResult = []);
    }

    inputTimeout = setTimeout(async () => {
      try {
        isFetchingCountries = true;
        countriesResult = await countriesQuery({ country: value || '' });
      } finally {
        isFetchingCountries = false;
      }
    }, 500);
  };

  /** lifecycles */
  onMount(() => {
    if (!globalSocket) {
      initSocket().subscribe((instance) => {
        socket = instance;
      });
    } else {
      socket = $globalSocket;
    }
  });

  /** react-ibles */
  $: console.log(countriesResult);
</script>

<svelte:head>
  <title>Exchange</title>
</svelte:head>

<Stack as="section" class="grid place-items-center gap-[2em]">
  <Input
    placeholder="Search"
    label="Select your country"
    kind="select"
    isLoading={isFetchingCountries}
    selectOptions={countriesResult.map(({ node }) => ({
      text: `${node.name} (${node.currencies.edges[0].node.code})`,
      value: node.currencies,
      icon: node.flag
    }))}
    containerProps={{ class: 'w-[30em] max-w-[90vw] anim__fadeInUp anim__del--025s' }}
    bind:value
    on:input={handleOnInput}>
    <SVGIcon name="search" slot="start-adornment" size="1.25em" />
  </Input>

  <Stack class="sm:flex-row gap-x-[1em] gap-y-[2em]">
    <Stack as="section" class="anim__fadeInUp anim__del--05s" gap="0.75em">
      <Card {data} />

      <Text as="small" class="font-bold">USD: $ 42000.479901</Text>
    </Stack>
  </Stack>
</Stack>
