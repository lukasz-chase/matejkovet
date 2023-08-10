<script>
  import { page } from "$app/stores";
</script>

<h1 class="text-3xl text-error">
  {$page.status}: {$page.error?.message ?? "Error"}
</h1>
