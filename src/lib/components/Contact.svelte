<script lang="ts">
  import Map from "./Map.svelte";
  export let session: any;
</script>

<div class="flex flex-col md:flex-row justify-center items-center p-4 gap-12">
  <div class="flex flex-col items-start justify-center text-xl gap-2">
    <span class="">Skontaktuj się</span>

    <span> Zadzwoń pod nr telefonu: </span>
    <b>+48 123 456 781</b>
    <span>Lub</span>
    <a
      href={session ? "/appointment/create" : "auth/login"}
      class="btn btn-wide bg-accent self-center">Umów wizytę</a
    >
  </div>
  <div class="">
    <Map />
  </div>
</div>
