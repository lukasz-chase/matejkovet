<script lang="ts">
  import type { Appointment } from "$lib/types/Appointment";
  import { writable } from "svelte/store";
  import UserAppointment from "$lib/components/userAppointment.svelte";
  import type { PageData } from "./$types";
  import CustomDate from "$lib/components/CustomDate.svelte";

  export let data: PageData;
  export const appointments = writable<Appointment[]>([]);
  export const appointmentsCount = writable<number[]>([]);

  const today = new Date();
  let date: Date | string = today.toJSON().slice(0, 10);

  $: if (date) {
    data
      .getAppointments(`${date}`)
      .then(({ appointmentsDB, appointmentsCountDB }) => {
        appointmentsCount.set(appointmentsCountDB ?? []);
        appointments.set(appointmentsDB ?? []);
      });
  }

  let { session } = data;
</script>

<div class="w-full p-2 text-center md:w-2/3 md:max-w-3xl">
  <CustomDate bind:date />
  {#if $appointments.length !== 0}
    <div class="join join-vertical w-full text-center max-w-5xl">
      <h1 class="font-bold uppercase text-2xl mb-4">Zaplanowane wizyty</h1>

      {#each $appointments as appointment}
        <UserAppointment {appointment} getUserProfile={data.getUserProfile} />
      {/each}
    </div>
    <div class="join">
      {#each $appointmentsCount as _, i}
        <a
          href="admin/appointment/scheduled/{session?.user.id}?start={i *
            10}&end={i * 10 + 10}"
          class="join-item btn btn-active">{i}</a
        >
      {/each}
    </div>
  {:else}
    <h1 class="font-bold uppercase text-2xl mb-4">Brak wizyt</h1>
  {/if}
</div>
