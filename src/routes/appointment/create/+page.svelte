<script lang="ts">
  import { enhance } from "$app/forms";
  import FormSuccess from "$lib/components/FormSuccess.svelte";
  import { DateInput } from "date-picker-svelte";
  import { writable } from "svelte/store";
  import type { SubmitFunction } from "./$types.js";

  export const hoursFilteredStore = writable<number[]>([]);
  export let data;
  export let form;
  let infoText = form?.info ?? "";
  let loading = false;
  const today = new Date();
  let date = today;

  $: if (date) {
    const selectedDate = date.toISOString().split("T")[0];
    data.getHours(selectedDate).then((hoursFiltered) => {
      hoursFilteredStore.set(hoursFiltered);
    });
  }

  $: dateInputValue = date ? date.toISOString().split("T")[0] : "";
  const createAppointment: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      console.log(data);
      await update();
    };
  };
</script>

<div
  class="min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-15rem)] w-full flex justify-center items-center"
>
  <form
    method="post"
    use:enhance={createAppointment}
    class="flex flex-col gap-4 items-center"
  >
    {#if form?.success}
      <FormSuccess title="Wizyta umówiona!" />
    {/if}
    <h1 class="text-3xl">Umów wizytę</h1>
    <DateInput
      bind:value={date}
      min={new Date()}
      closeOnSelection
      format="yyyy-MM-dd"
      class="w-full max-w-xs flex justify-center"
    />
    <input type="hidden" name="date" value={dateInputValue} />
    {#if $hoursFilteredStore.length !== 0}
      <div class="form-control w-full p-x-4">
        <label for="name" class="label">
          <span class="label-text">Imie</span>
        </label>
        <input
          value={data.userProfile?.first_name ?? form?.firstName ?? ""}
          name="firstName"
          type="text"
          placeholder="imie"
          class="input input-bordered w-full md:max-w-xs"
        />
        <label for="lastName" class="label">
          <span class="label-text">Nazwisko</span>
        </label>
        <input
          value={data.userProfile?.last_name ?? form?.lastName ?? ""}
          name="lastName"
          type="text"
          placeholder="nazwisko"
          class="input input-bordered w-full md:max-w-xs mb-2"
        />

        <select name="hour" class="select select-bordered w-full md:max-w-xs">
          <option disabled selected>Godzina wizyty</option>
          {#each $hoursFilteredStore as hour}
            <option>{hour}:00</option>
          {/each}
        </select>

        <label class="label" for="info">
          <span class="label-text">Dodatkowe uwagi</span>
        </label>
        <textarea
          bind:value={infoText}
          name="info"
          class="textarea textarea-bordered h-24"
          placeholder="Uwagi"
          maxlength="300"
        />
        <label class="label" for="info">
          <span class="label-text">{infoText.length}/300</span>
        </label>
      </div>
      {#if form?.fieldMissing}<p class="text-error text-md my-2">
          {form.fieldMissing}
        </p>{/if}
      {#if form?.supabaseErrorMessage}<p class="text-error text-md">
          {form?.supabaseErrorMessage}
        </p>{/if}
      {#if loading}
        <span class="loading loading-dots loading-sm" />
      {:else}
        <button
          class="btn btn-active btn-wide btn-primary mb-2"
          disabled={loading}
        >
          Umów
        </button>
      {/if}
    {:else}
      <div>
        <h1>W tym dniu nie ma już dostępnych wizyt</h1>
      </div>
    {/if}
  </form>
</div>
