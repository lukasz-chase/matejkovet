<script>
  import { page } from "$app/stores";
</script>

<div
  class="h-[calc(100vh-5rem)] md:h-[calc(100vh-15rem)] w-full flex justify-center items-center"
>
  <h1 class="text-3xl text-error">
    {$page.status}: {$page.error?.message ?? "Error"}
  </h1>
</div>
