<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ session } = data);
</script>

<div class="flex flex-col gap-4 border-y-2 border-accent p-8">
  <a
    class="btn btn-ghost upper-case content-center text-sm md:text-3xl p-4"
    href="/appointment/create">Umów wizytę</a
  >
  <a
    class="btn btn-ghost upper-case content-center text-sm md:text-3xl p-4"
    href="/appointment/history/{session?.user.id}">Historia wizyt</a
  >
  <a
    class="btn btn-ghost upper-case content-center text-sm md:text-3xl p-4"
    href="/appointment/scheduled/{session?.user.id}">Umówione wizyty</a
  >
</div>
