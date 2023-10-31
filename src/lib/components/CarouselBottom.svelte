<script lang="ts">
  import type { Review } from "$lib/types/Review";
  import { Icon, Star } from "svelte-hero-icons";

  export let review: Review | null;
</script>

<div class="flex items-center flex-col h-10 p-2 my-2 text-center">
  <h2 class="text-sm md:text-xl font-semibold mb-2">
    {review?.name}
  </h2>
  <div class="flex mb-2">
    {#each Array.from({ length: 10 }) as _, i}
      <Icon
        src={Star}
        mini
        class={`h-4 w-4 md:h-6 md:w-6 ${
          (review?.rating ?? 0) >= i
            ? "text-yellow-400"
            : "text-gray-400 opacity-50"
        }`}
      />
    {/each}
  </div>
  {review?.comment}
</div>
