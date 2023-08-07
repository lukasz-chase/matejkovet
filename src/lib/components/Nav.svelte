<script lang="ts">
  import { goto } from "$app/navigation";
  export let supabase: any;
  export let session: any;
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    goto("/auth/login");
  };
</script>

<nav
  class="relative mx-8 flex justify-between items-center pt-2 md:pt-12 pb-2 md:pb-6 font-medium md:mx-16 lg:mx-32 text-primary-content"
>
  <svg
    class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary"
    width="250"
    height="4"
    viewBox="0 0 250 4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path d="M2 2L428 2" stroke-width={2} stroke-linecap="round" />
  </svg>
  <a href="/" class="btn btn-ghost normal-case text-sm md:text-xl px-0 py-0"
    >Matejkovet</a
  >
  <div class="flex gap-2 md:gap-6">
    {#if session?.user}
      <a
        href="/appointment"
        class="btn btn-ghost normal-case text-sm md:text-xl px-0 py-0">Wizyta</a
      >
      <button
        class="btn btn-ghost normal-case text-sm md:text-xl px-0 py-0 md:p-1"
        on:click={handleSignOut}>Wyloguj się</button
      >
    {:else}
      <a
        href="/auth/login"
        class="btn btn-ghost normal-case text-sm md:text-xl px-0 py-0"
        >logowanie</a
      >
    {/if}

    <slot />
  </div>
</nav>
