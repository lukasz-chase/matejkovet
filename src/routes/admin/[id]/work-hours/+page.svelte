<script lang="ts">
  import { enhance } from "$app/forms";
  import FormSuccess from "$lib/components/FormSuccess.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let form;
</script>

<div class="p-4">
  {#if form?.success}
    <FormSuccess title="Godziny zmienione!" />
  {/if}
  <h2 class="text-xl font-bold mb-4 text-center">Zarządzaj godzinami pracy</h2>
  <form
    method="post"
    use:enhance
    class="flex flex-col items-center justify-center"
  >
    {#each Object.keys(data.workingHours) as day}
      <div
        class="flex flex-col md:flex-row items-center md:justify-center mb-2 text-sm md:text-xl"
      >
        <label for={day} class="w-full md:w-36">{day}:</label>
        <div>
          <input
            step="3600"
            type="time"
            name={day + "-open"}
            id={day + "-open"}
            bind:value={data.workingHours[day].open}
            class="input input-bordered mr-2"
          />
          do
          <input
            step="3600"
            type="time"
            name={day + "-close"}
            id={day + "-close"}
            bind:value={data.workingHours[day].close}
            class="input input-bordered ml-2"
          />
        </div>
      </div>
    {/each}
    <button class="btn btn-primary btn-wide mt-4">Zapisz</button>
  </form>
</div>
