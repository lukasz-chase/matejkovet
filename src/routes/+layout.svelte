<script lang="ts">
  import "../app.css";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import Nav from "$lib/components/Nav.svelte";
  import { enhance } from "$app/forms";
  import { Icon, Sun, Moon } from "svelte-hero-icons";
  import type { SubmitFunction } from "./$types.js";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
  let { supabase, session, colorTheme, profile } = data;
  $: ({ supabase, session, colorTheme, profile } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });
  const submitUpdateTheme: SubmitFunction = ({ action }) => {
    const changedTheme = action.searchParams.get("theme");
    if (changedTheme) {
      document.documentElement.setAttribute("data-theme", changedTheme);
    }
  };
</script>

<Nav {supabase} {session} {profile}>
  <form method="POST" use:enhance={submitUpdateTheme}>
    {#if colorTheme === "business"}
      <button
        class="btn btn-ghost normal-case text-sm px-0 py-0"
        formaction="/?/setTheme&theme=cupcake&redirectTo={$page.url.pathname}"
      >
        <Icon src={Sun} class="h-6 w-6" />
      </button>
    {:else}
      <button
        class="btn btn-ghost normal-case text-sm px-0 py-0"
        formaction="/?/setTheme&theme=business&redirectTo={$page.url.pathname}"
      >
        <Icon src={Moon} mini class="h-6 w-6" />
      </button>
    {/if}
  </form>
</Nav>
<div
  class="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-6.4rem)] w-full flex flex-col gap-8 items-center justify-center font-poppins"
>
  <slot />
</div>
