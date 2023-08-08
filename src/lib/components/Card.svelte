<script lang="ts">
  import type { Review } from "$lib/types/Review";
  import { Icon, Star } from "svelte-hero-icons";

  export let review: Review;
  console.log(review);
</script>

<div
  class="flex w-[300px] flex-col flex-none bg-primary-content shadow-lg rounded-lg p-4 border border-content-secondary"
>
  <h2 class="card-title text-xl font-semibold mb-2 text-base-100">
    {review.name}
    {review.surname}
  </h2>
  <img
    src={review.photoURL}
    alt="review"
    class="h-40 w-40 md:h-60 md:w-60 object-contain mb-4"
  />
  <div class="flex mb-2">
    {#each Array.from({ length: 10 }) as _, i}
      <Icon
        src={Star}
        mini
        class={`h-2 w-2 md:h-4 md:w-4 ${
          review.rating >= i ? "text-yellow-400" : "text-gray-400 opacity-50"
        }`}
      />
    {/each}
  </div>
  <p class="text-base-100 text-sm text-ellipsis overflow-hidden max-w-[250px]">
    {review.comment}
  </p>
</div>
