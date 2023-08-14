<script lang="ts">
  import { enhance } from "$app/forms";
  import Modal from "$lib/components/Modal.svelte";
  import RatingRadio from "$lib/components/RatingRadio.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { ActionData } from "../../routes/appointment/[type]/[id]/$types";
  import FormSuccess from "./FormSuccess.svelte";
  import type { Appointment } from "$lib/types/Appointment";

  let loading: boolean;
  export let session: any;
  export let form: ActionData;
  export let showModal: boolean = false;
  export let ratingDate: string;
  export let appointmentId: number;
  let ratingValue: number = 5;
  let previewURL: string;
  let modifiedAppointment: Appointment | { id: number } = { id: 0 };
  const setPreview = (e: any) => {
    const file = e.target.files[0];
    previewURL = URL.createObjectURL(file);
  };
  const createReview: SubmitFunction = () => {
    loading = true;
    return async ({ update, result }) => {
      if (result.data.modifiedAppointment) {
        modifiedAppointment = result.data.modifiedAppointment[0] ?? { id: 0 };
      }
      loading = false;
      await update();
    };
  };
</script>

<Modal bind:showModal>
  <div
    slot="header"
    class="font-bold text-2xl flex flex-col lg:flex-row lg:gap-2"
  >
    <h1>Wizyta z dnia:</h1>
    <h1>{ratingDate}</h1>
  </div>
  <form use:enhance={createReview} method="post" enctype="multipart/form-data">
    {#if form?.success && modifiedAppointment.id === appointmentId}
      <FormSuccess title="Opinia wystawiona!" />
    {:else}
      <div class="form-control flex flex-col">
        <label for="opinion" class="label">
          <span class="label-text">Jak przebiegła twoja wizyta?</span>
        </label>
        <textarea
          name="opinion"
          class="textarea textarea-bordered h-24"
          placeholder="Opinia"
        />
        <label for="file" class="label">
          <span class="label-text">Zdjęcie z wizyty</span>
        </label>
        {#if previewURL}
          <img
            src={previewURL}
            class="w-20 h-20 self-center my-2"
            alt="wizyta"
          />
        {/if}
        <input
          on:change={setPreview}
          type="file"
          name="file"
          class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          accept="image/*"
        />
        <RatingRadio
          options={Array.from({ length: 11 })}
          bind:userSelected={ratingValue}
        />
        <input type="hidden" name="rating" value={ratingValue} />
        <input type="hidden" name="appointmentId" value={appointmentId} />
        {#if form?.formError}<p class="text-error text-xl">
            {form.formError}
          </p>
        {/if}
        {#if form?.noUserDataError}<p class="text-error text-xl">
            {form.noUserDataError}
            <a href={`user/${session?.user.id}/settings`}>tutaj</a>
          </p>
        {/if}
        {#if loading}
          <span class="loading loading-xl loading-spinner self-center" />
        {:else}
          <button class="btn btn-primary w-full max-w-3xl" disabled={loading}
            >Wystaw opinie</button
          >
        {/if}
      </div>
    {/if}
  </form>
</Modal>
