<script lang="ts">
  import { enhance } from "$app/forms";
  import FormSuccess from "$lib/components/FormSuccess.svelte";
  import type { PageData } from "./$types";

  export let form;
  export let data: PageData;
</script>

<div
  class="h-[calc(100vh-5rem)] md:h-[calc(100vh-15rem)] w-full flex flex-col justify-center items-center"
>
  <form use:enhance method="post">
    {#if form?.success}
      <FormSuccess title="ustawienia zmienione pomyślnie" />
    {/if}
    <h1 class="font-bold text-2xl">Ustawienia konta</h1>
    <div class="form-control w-full max-w-xs">
      <label for="name" class="label">
        <span class="label-text text-xl">Imie</span>
      </label>
      <input
        value={data.userProfile?.first_name ?? form?.firstName ?? ""}
        name="firstName"
        type="text"
        placeholder="imie"
        class="input input-bordered w-full max-w-xs"
      />
      <label for="lastName" class="label">
        <span class="label-text text-xl">Nazwisko</span>
      </label>
      <input
        value={data.userProfile?.last_name ?? form?.lastName ?? ""}
        name="lastName"
        type="text"
        placeholder="nazwisko"
        class="input input-bordered w-full max-w-xs"
      />
      <button class="btn btn-wide btn-primary mt-4">Zapisz</button>
    </div>
  </form>
</div>
