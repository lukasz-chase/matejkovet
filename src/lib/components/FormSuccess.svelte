<script lang="ts">
  import { Icon, CheckCircle } from "svelte-hero-icons";
  export let title: string;
</script>

<div class="alert alert-success">
  <Icon src={CheckCircle} class="h-8 w-8" />
  <span class="uppercase font-bold">{title}</span>
</div>
