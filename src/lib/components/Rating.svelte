<script lang="ts">
  import type { Review } from "$lib/types/Review";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";

  export let supabase: any;
  let reviewsLeft: Review[] = [];
  let reviewsRight: Review[] = [];

  async function loadData() {
    const { data: result } = await supabase
      .from("reviews")
      .select("*")
      .limit(20);
    reviewsLeft = [
      ...result.filter((_: any, index: number) => index % 2 === 0),
    ];
    reviewsRight = [
      ...result.filter((_: any, index: number) => index % 2 !== 0),
    ];
  }

  const shiftLeft = () =>
    (reviewsLeft = [...reviewsLeft, reviewsLeft.shift()!]);
  const shiftRight = () =>
    (reviewsRight = [reviewsRight.pop()!, ...reviewsRight]);

  onMount(loadData);
</script>

<div class="h-screen w-full flex justify-center items-center">
  <div
    class="flex flex-col h-full justify-center items-center relative overflow-hidden w-3/4"
  >
    <div class="absolute top-0 md:top-10" on:animationiteration={shiftRight}>
      <div class="flex gap-4 scrolling-right">
        {#each [...reviewsRight] as review, i}
          <Card {review} />
        {/each}
      </div>
    </div>
    <div
      class="absolute bottom-0 md:bottom-10"
      on:animationiteration={shiftLeft}
    >
      <div class="flex gap-4 scrolling-left">
        {#each [...reviewsLeft] as review, i}
          <Card {review} />
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .scrolling-left {
    animation: scrollLeftSm 20s linear infinite;
  }
  .scrolling-right {
    animation: scrollRightSm 20s linear infinite;
  }
  @media (min-width: 768px) {
    .scrolling-right {
      animation: scrollRight 20s linear infinite;
    }
    .scrolling-left {
      animation: scrollLeft 20s linear infinite;
    }
  }
  @keyframes scrollRightSm {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(+200px);
    }
  }
  @keyframes scrollRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(+300px);
    }
  }
  @keyframes scrollLeftSm {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-200px);
    }
  }
  @keyframes scrollLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-300px);
    }
  }
</style>
