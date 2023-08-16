<script lang="ts">
  import type { Appointment } from "$lib/types/Appointment";
  import type { Profile } from "$lib/types/Profile";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let appointment: Appointment;
  export let getUserProfile: (id: string) => Promise<{
    profile: any;
  }>;
  const userProfile = writable<Profile>({});
  onMount(async () => {
    const { profile } = await getUserProfile(appointment.user_id);
    userProfile.set(profile);
  });
</script>

<div class="collapse collapse-arrow join-item border border-accent">
  <input type="radio" name="my-accordion-2" checked={false} />
  <div class="collapse-title text-xl font-medium">
    {appointment.date}
    {appointment.hour}
  </div>
  <div class="collapse-content flex flex-col gap-8">
    <h2>{$userProfile.first_name} {$userProfile.last_name}</h2>
    <p>
      {appointment.info}
    </p>
  </div>
</div>
