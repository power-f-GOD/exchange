/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
  interface Locals {
    userid: string;
  }

  type Platform = Record<string, any>;

  type Session = Record<string, any>;

  type Stuff = Record<string, any>;
}
