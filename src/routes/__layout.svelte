<script lang="ts">
  /** external deps */
  import { onDestroy } from 'svelte';

  /** internal deps */
  import { closeSocket, globalSocket, initSocket } from '../socket';

  /** funcs */
  if (!globalSocket) {
    initSocket();
  }

  /** lifecycles */
  onDestroy(() => {
    closeSocket();
  });
</script>

<main class="Layout px-4 py-6 bg-white grid rounded place-items-center anim__fadeInUpBig">
  <slot />
</main>

<style lang="scss" global>
  /* 
    The global style attribute (above)...A hack (https://github.com/sveltejs/kit/issues/915#issuecomment-1047419419) for the FOUC (Flash Of Unstyled Content) in dev mode (not sure if it happens in prod yet/though). 
    See the issue here: https://github.com/sveltejs/kit/issues/915 
  */
  @import 'src/app.scss';

  main.Layout {
    height: 100%;
    width: 100%;

    @media screen and (min-width: 768px) {
      width: 70em;
      max-width: 78%;
      height: 71.5%;
      max-height: 45.8em;
      min-height: 35em;
      box-shadow: 0 6.25em 5em rgba(157, 157, 174, 0.07), 0 2.6em 2em rgba(157, 157, 174, 0.05),
        0 1.375em 1.5em rgba(157, 157, 174, 0.04), 0 1em 0.625em rgba(157, 157, 174, 0.04),
        0 0.375em 0.375em rgba(157, 157, 174, 0.03), 0 0.125em 0.125em rgba(157, 157, 174, 0.02);
    }
  }
</style>
