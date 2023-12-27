<script lang="ts">
  import Map from "./Map.svelte";
  export let session: any;
  export let workingHours: any;
</script>

<div class="flex flex-col md:flex-row justify-center items-center pb-4 gap-12">
  <div class="flex flex-col items-start justify-center text-xl gap-2">
    <span> Zadzwoń pod nr: </span>
    <b>+48 123 456 781</b>
    <span>Lub</span>
    <a
      href={session ? "/appointment/create" : "auth/login"}
      class="btn btn-wide bg-accent self-center">Umów wizytę na stronie</a
    >

    <div class="mt-4">
      <span class="font-bold">Godziny otwarcia:</span>
      <div class="flex flex-col">
        {#each Object.keys(workingHours) as day}
          <span class="mt-1 first-letter:uppercase">
            {day}: {workingHours[day].open} - {workingHours[day].close}
          </span>
        {/each}
      </div>
    </div>
  </div>
  <div class="w-10/12 overflow-hidden">
    <Map />
  </div>
</div>
