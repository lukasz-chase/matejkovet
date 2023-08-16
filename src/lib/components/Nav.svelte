<script lang="ts">
  import { goto } from "$app/navigation";
  export let supabase: any;
  export let session: any;
  export let profile: any;
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    goto("/auth/login");
  };
</script>

<div class="navbar relative bg-base-100 px-4">
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
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-xl">Matejkovet</a>
  </div>
  <div class="flex-none gap-2">
    <slot />
    <div class="form-control" />
    {#if session?.user}
      <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost normal-case text-xl px-0">
          Konto
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
        >
          {#if profile.role === "user"}
            <li>
              <a
                href={`/user/${session.user.id}/settings`}
                class="btn btn-ghost normal-case content-center text-xl px-0 py-0"
                >Ustawienia</a
              >
            </li>
          {/if}
          <li>
            <a
              href="/appointment"
              class="btn btn-ghost normal-case content-center text-xl px-0 py-0"
              >Wizyta</a
            >
          </li>
          <li>
            <button
              class="btn btn-ghost normal-case content-center text-xl px-0 py-0 md:p-1"
              on:click={handleSignOut}>Wyloguj się</button
            >
          </li>
        </ul>
      </div>
    {:else}
      <a
        href="/auth/login"
        class="btn btn-ghost normal-case content-center text-sm md:text-xl px-0 py-0"
        >logowanie</a
      >
    {/if}
  </div>
</div>
