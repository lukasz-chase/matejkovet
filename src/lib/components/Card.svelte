<script lang="ts">
  import type { review } from "$lib/types/Review";

  export let review: review;
</script>

<div class="card w-96 bg-base-100 shadow-xl flex-none">
  <div class="card-body">
    <h2 class="card-title">{review.name} {review.surname}</h2>
    <p>{review.comment}</p>
  </div>
</div>
