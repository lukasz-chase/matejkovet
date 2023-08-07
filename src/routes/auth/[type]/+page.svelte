<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  export let form;
  let currentPageType: string;

  $: {
    currentPageType = $page.params.type;
  }
</script>

<div
  class="h-[calc(100vh-6.5rem)] flex flex-col gap-4 justify-center items-center"
>
  <h1 class="text-3xl">
    {#if currentPageType === "login"}
      Logowanie
    {:else}
      Rejestracja
    {/if}
  </h1>
  <form
    method="post"
    use:enhance
    class="flex flex-col gap-4 items-center justify-center"
  >
    <input
      name="email"
      value={form?.email ?? ""}
      placeholder="Email"
      class="input input-bordered w-full max-w-xs"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      class="input input-bordered w-full max-w-xs"
    />
    {#if currentPageType === "login"}
      <button class="btn btn-wide btn-primary" formaction="?/login"
        >Zaloguj się
      </button>
      <p>
        Nie masz jeszcze konta? <a href="/auth/register" class="text-secondary"
          >Zarejestruj się</a
        >
      </p>
    {:else}
      <button
        class="btn btn-wide btn-primary text-center"
        formaction="?/register">Zarejestruj się</button
      >
      <p>
        Masz już konto? <a href="/auth/login" class="text-secondary"
          >Zaloguj się</a
        >
      </p>
    {/if}
  </form>
</div>
