<script lang="ts">
  /** external deps */
  import { onMount } from 'svelte';

  /** internal deps */
  import { addCommasToNumber, Http } from '$lib';
  import { initSocket, socketSend, ADATickers, BTCTickers, ETHTickers } from '../socket';
  import { countriesQuery } from '../graphql';
  import type { Country } from '../types';
  import Text from '../components/shared/Text.svelte';
  import Input from '../components/shared/Input.svelte';
  import Stack from '../components/shared/Stack.svelte';
  import SVGIcon from '../components/shared/SVGIcon.svelte';
  import Card from '../components/shared/Card.svelte';
  import Skeleton from '../components/shared/Skeleton.svelte';

  /** vars */
  let inputTimeout: any;
  let value = '';
  let isFetchingCountries = false;
  let isGettingRate = false;
  let countriesResult: Country[] = [];
  let exchangeRate: {
    code: string;
    symbol: string;
    base?: string;
    rates?: Record<string, number>;
  } = { code: 'USD', symbol: '$' };

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

  const handleOptionSelect = (node: { code: string; symbol: string }) => async () => {
    const { code, symbol } = node;

    try {
      isGettingRate = true;
      exchangeRate = {
        ...(await Http.get(`https://api.exchangerate.host/latest?base=USD&symbols=${symbol}`)),
        symbol,
        code
      };
    } catch (e) {
      exchangeRate = exchangeRate;
    } finally {
      isGettingRate = false;
    }
  };

  /** react-ibles */
  $: tickers = [$ADATickers, $BTCTickers, $ETHTickers];

  /** lifecycles */
  onMount(() => {
    initSocket().subscribe(() => {
      socketSend(
        {
          method: 'SUBSCRIBE',
          params: ['btcusdt@ticker', 'ethusdt@ticker', 'adausdt@ticker'],
          id: 1
        },
        true,
        process.env.NODE_ENV === 'production' ? 5000 : 10000
      );
    });
  });
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
      icon: node.flag,
      action: handleOptionSelect(node.currencies.edges[0].node)
    }))}
    containerProps={{ class: 'w-[30em] max-w-[90vw] anim__fadeInUp anim__del--025s' }}
    bind:value
    on:input={handleOnInput}>
    <SVGIcon name="search" slot="start-adornment" size="1.25em" />
  </Input>

  <Stack class="flex-row flex-wrap px-3 justify-center gap-x-[1em] gap-y-[2em] lh-1">
    {#each tickers as data, i}
      <Stack
        as="section"
        class="anim__fadeInUp"
        style={`animation-delay: ${(i + 1) * 0.25}s`}
        gap="0.75em">
        <Card {data} />

        <Text as="small" class="font-bold w-full">
          {#if data.slice(-1)[0] && !isGettingRate}
            {exchangeRate?.code || 'USD'}: {exchangeRate?.symbol || '$'}
            {addCommasToNumber(
              +data.slice(-1)[0].a *
                (exchangeRate.code === 'USD' ? 1 : (exchangeRate.rates || {})[exchangeRate.code]),
              true
            )}
          {:else}
            <Skeleton class="w-3/4" />
          {/if}
        </Text>
      </Stack>
    {/each}
  </Stack>
</Stack>
