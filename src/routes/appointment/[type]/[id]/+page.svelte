<script lang="ts">
  import ReviewModal from "$lib/components/ReviewModal.svelte";
  import { appointments } from "$lib/store/store";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let form;
  let { session, type, appointmentsCount, supabase } = data;

  let showModal: boolean = false;
  let ratingDate: string;
  let appointmentId: number;

  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const monthAgo = date.toJSON().slice(0, 10);
  const cancelAppointment = async (id: number) => {
    await supabase.from("appointments").delete().eq("id", id);
    appointments.set($appointments.filter((a) => a.id !== id));
  };
  const showModalHandler = (
    appointment_id: number,
    date: Date,
    hour: string
  ) => {
    showModal = true;
    ratingDate = `${date} ${hour}`;
    appointmentId = appointment_id;
  };
</script>

{#if $appointments.length !== 0}
  <div class="join join-vertical w-full text-center max-w-5xl">
    {#if data.type === "history"}
      <h1 class="font-bold uppercase text-2xl my-4">Historia wizyt</h1>
    {:else}
      <h1 class="font-bold uppercase text-2xl my-4">Zaplanowane wizyty</h1>
    {/if}
    {#each $appointments as appointment}
      <div class="collapse collapse-arrow join-item border border-accent">
        <input type="radio" name="my-accordion-2" checked={false} />
        <div class="collapse-title text-xl font-medium">
          {appointment.date}
          {appointment.hour}
        </div>
        <div class="collapse-content flex flex-col gap-8">
          <p>
            {appointment.info}
          </p>
          {#if type === "history" && !appointment.review && `${appointment.date}` > monthAgo}
            <button
              class="btn btn-xs btn-info w-32 self-end"
              on:click|stopPropagation={() =>
                showModalHandler(
                  appointment.id,
                  appointment.date,
                  appointment.hour
                )}>Wystaw opinie</button
            >
          {/if}
          {#if type === "scheduled"}
            <button
              class="btn btn-xs btn-error w-20 self-end"
              on:click={() => cancelAppointment(appointment.id)}>Odwołaj</button
            >
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div class="join">
    {#each appointmentsCount as _, i}
      <a
        href="/appointment/{type}/{session?.user.id}?start={i * 10}&end={i *
          10 +
          10}"
        class="join-item btn btn-active">{i}</a
      >
    {/each}
  </div>
{:else}
  <h1 class="font-bold uppercase text-2xl mb-4">Brak wizyt</h1>
{/if}

<ReviewModal {form} bind:showModal {ratingDate} {session} {appointmentId} />
