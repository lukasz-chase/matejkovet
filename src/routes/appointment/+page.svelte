<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ session, profile } = data);
</script>

<div class="flex flex-col gap-4 border-y-2 border-accent p-8">
  {#if profile.role === "user"}
    <a
      class="btn btn-ghost upper-case content-center text-xl md:text-3xl p-4"
      href="/appointment/create">Umów wizytę</a
    >
    <a
      class="btn btn-ghost upper-case content-center text-xl md:text-3xl p-4"
      href="/appointment/history/{session?.user.id}">Historia wizyt</a
    >
    <a
      class="btn btn-ghost upper-case content-center text-xl md:text-3xl p-4"
      href="/appointment/scheduled/{session?.user.id}">Umówione wizyty</a
    >
  {/if}
  {#if profile.role === "admin"}
    <a
      class="btn btn-ghost upper-case content-center text-xl md:text-3xl p-4"
      href="/admin/{session?.user.id}/appointments/scheduled">Umówione wizyty</a
    >
    <a
      class="btn btn-ghost upper-case content-center text-xl md:text-3xl p-4"
      href="/admin/{session?.user.id}/work-hours">Godziny pracy</a
    >
  {/if}
</div>
