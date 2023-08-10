<script lang="ts">
  import { enhance } from "$app/forms";
  import FormSuccess from "$lib/components/FormSuccess.svelte";
  import type { PageData } from "./$types";

  export let form;
  export let data: PageData;
</script>

<form method="post" class=" w-fullmd:w-2/4">
  {#if form?.success}
    <FormSuccess title="ustawienia zmienione pomyślnie" />
  {/if}
  <h1 class="font-bold text-2xl text-center pt-2">Ustawienia konta</h1>
  <div class="form-control w-full">
    <label for="firstName" class="label">
      <span class="label-text text-xl">Imie</span>
    </label>

    <input
      value={form?.firstName ?? data.userProfile?.first_name ?? ""}
      name="firstName"
      type="text"
      placeholder="imie"
      class="input input-bordered w-full"
    />
    <label for="lastName" class="label">
      <span class="label-text text-xl">Nazwisko</span>
    </label>
    <input
      value={form?.lastName ?? data.userProfile?.last_name ?? ""}
      name="lastName"
      type="text"
      placeholder="nazwisko"
      class="input input-bordered w-full"
    />
    <button class="btn w-full btn-primary mt-4">Zapisz</button>
  </div>
</form>
