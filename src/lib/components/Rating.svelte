<script lang="ts">
  import type { Review } from "$lib/types/Review";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";

  export let supabase: any;
  let reviewsLeft: Review[] = [];
  let reviewsRight: Review[] = [];
  let asd: HTMLElement;

  async function loadData() {
    const { data: result, error } = await supabase
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

  function shiftLeft() {
    const firstLeftReview = reviewsLeft.shift();
    if (firstLeftReview) {
      reviewsLeft = [...reviewsLeft, firstLeftReview];
    }
  }

  function shiftRight() {
    const firstRightReview = reviewsRight.pop();
    if (firstRightReview) {
      reviewsRight = [firstRightReview, ...reviewsRight];
    }
  }

  onMount(loadData);
</script>

<div class="h-screen w-full flex justify-center items-center">
  <div
    class="flex flex-col h-full justify-center items-center relative overflow-hidden w-3/4"
  >
    <div class="absolute top-10" on:animationiteration={shiftRight}>
      <div class="flex gap-4 scrolling-right">
        {#each [...reviewsRight] as review, i}
          <Card {review} />
        {/each}
      </div>
    </div>
    <div class="absolute bottom-10" on:animationiteration={shiftLeft}>
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
    animation: scrollLeft 20s linear infinite;
  }
  .scrolling-right {
    animation: scrollRight 20s linear infinite;
  }

  @keyframes scrollRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(+300px);
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
