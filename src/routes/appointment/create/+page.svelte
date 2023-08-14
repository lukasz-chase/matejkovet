<script lang="ts">
  import { enhance } from "$app/forms";
  import FormSuccess from "$lib/components/FormSuccess.svelte";
  import { writable } from "svelte/store";
  import type { SubmitFunction } from "./$types.js";
  import { onMount } from "svelte";

  export const hoursFilteredStore = writable<number[]>([]);
  export let data;
  export let form;
  let infoText = form?.info ?? "";
  let loading = false;
  const today = new Date();
  let nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  let maxDate = nextMonth.toJSON().slice(0, 10);
  let date: Date | string = today.toJSON().slice(0, 10);
  let dateContainer: HTMLInputElement;

  $: if (date) {
    data.getHours(`${date}`).then((hoursFiltered) => {
      hoursFilteredStore.set(hoursFiltered);
    });
  }

  const createAppointment: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      await update();
    };
  };
</script>

<form
  method="post"
  use:enhance={createAppointment}
  class="flex flex-col gap-2 mt-4 items-center w-full max-w-2xl"
>
  {#if form?.success}
    <FormSuccess title="Wizyta umówiona!" />
  {:else}
    <div class="form-control w-full p-4">
      <h1 class="text-3xl self-center">Umów wizytę</h1>
      <label for="date" class="label">
        <span class="label-text">Data</span>
      </label>
      <input
        class="input input-bordered w-full"
        type="date"
        name="date"
        min={today.toJSON().slice(0, 10)}
        max={maxDate}
        bind:value={date}
        bind:this={dateContainer}
      />
      {#if $hoursFilteredStore.length !== 0}
        <label for="name" class="label">
          <span class="label-text">Imie</span>
        </label>
        <input
          value={data.userProfile?.first_name ?? form?.firstName ?? ""}
          name="firstName"
          type="text"
          placeholder="imie"
          class="input input-bordered w-full"
        />
        <label for="lastName" class="label">
          <span class="label-text">Nazwisko</span>
        </label>
        <input
          value={data.userProfile?.last_name ?? form?.lastName ?? ""}
          name="lastName"
          type="text"
          placeholder="nazwisko"
          class="input input-bordered w-full"
        />
        <label for="hour" class="label">
          <span class="label-text">Godzina</span>
        </label>
        <select name="hour" class="select select-bordered w-full">
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

        {#if form?.fieldMissing}<p class="text-error text-md">
            {form.fieldMissing}
          </p>{/if}
        {#if form?.supabaseErrorMessage}<p class="text-error text-md">
            {form?.supabaseErrorMessage}
          </p>{/if}
        {#if loading}
          <span class="loading loading-dots loading-sm self-center" />
        {:else}
          <button
            class="btn btn-active w-full btn-primary mb-2"
            disabled={loading}
          >
            Umów
          </button>
        {/if}
      {:else}
        <div class="py-4">
          <h1 class="text-warning text-lg text-center">
            W dniu {date} nie ma już dostępnych terminów
          </h1>
        </div>
      {/if}
    </div>
  {/if}
</form>
