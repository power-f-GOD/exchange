<script lang="ts">
  /** internal deps */
  import '/src/app.scss';
</script>

<main class="bg-white grid rounded place-items-center">
  <slot />
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 70em;
      max-width: 78%;
      height: 71.5%;
      max-height: 45.8em;
      box-shadow: 0 6.25em 5em rgba(157, 157, 174, 0.07), 0 2.6em 2em rgba(157, 157, 174, 0.05),
        0 1.375em 1.5em rgba(157, 157, 174, 0.04), 0 1em 0.625em rgba(157, 157, 174, 0.04),
        0 0.375em 0.375em rgba(157, 157, 174, 0.03), 0 0.125em 0.125em rgba(157, 157, 174, 0.02);
    }
  }
</style>
