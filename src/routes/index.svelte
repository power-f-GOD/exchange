<script lang="ts">
  import IconButton from '../components/shared/IconButton.svelte';
  import Input from '../components/shared/Input.svelte';
  import Stack from '../components/shared/Stack.svelte';
  import SVGIcon from '../components/shared/SVG.Icon.svelte';
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<Stack as="section">
  <Input placeholder="">
    <SVGIcon name="search" slot="start-adornment" size="1.25em" />
    <IconButton icon="caret" slot="end-adornment" size="small" />
  </Input>
</Stack>
