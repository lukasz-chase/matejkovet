<script lang="ts">
  import type { Review } from "$lib/types/Review";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";

  export let supabase: any;
  let reviewsLeft: Review[] = [];
  let reviewsRight: Review[] = [];

  async function loadData() {
    const { data: result } = await supabase.from("reviews").select("*");

    reviewsLeft = [
      ...result?.filter((_: any, index: number) => index % 2 === 0),
    ];
    reviewsRight = [
      ...result?.filter((_: any, index: number) => index % 2 !== 0),
    ];
  }

  onMount(loadData);
</script>

<div class=" w-full flex justify-center items-center">
  <div
    class="flex flex-col h-full justify-center items-center relative overflow-hidden w-3/4"
  >
    <div
      class="scroller"
      style="--_animation-duration: {reviewsRight.length * 5}s"
      data-animated="true"
    >
      <div class="scroller__inner">
        {#each [...reviewsRight] as review}
          <Card {review} />
        {/each}
        {#each [...reviewsRight] as review}
          <Card {review} />
        {/each}
      </div>
    </div>
    <div
      class="scroller"
      style="--_animation-duration: {reviewsLeft.length * 5}s"
      data-animated="true"
      data-direction="right"
    >
      <div class="scroller__inner">
        {#each [...reviewsLeft] as review}
          <Card {review} />
        {/each}
        {#each [...reviewsLeft] as review}
          <Card {review} />
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .scroller {
    max-width: 100%;
  }
  @media (min-width: 768px) {
    .scroller {
      max-width: 90%;
    }
  }
  .scroller__inner {
    display: flex;
    gap: 1rem;
    padding-block: 1rem;
    flex-wrap: wrap;
  }
  @media (prefers-reduced-motion: no-preference) {
    .scroller {
      overflow: hidden;
      -webkit-mask: linear-gradient(
        90deg,
        transparent,
        white 20%,
        white 80%,
        transparent
      );
      mask: linear-gradient(
        90deg,
        transparent,
        white 20%,
        white 80%,
        transparent
      );
    }
    .scroller__inner {
      width: fit-content;
      flex-wrap: nowrap;
      animation: scroll var(--_animation-duration, 40s)
        var(--_animation-direction, forwards) linear infinite;
    }
    .scroller[data-direction="right"] {
      --_animation-direction: reverse;
    }
    @keyframes scroll {
      to {
        transform: translate(calc(-50% - 0.5rem));
      }
    }
  }
</style>
