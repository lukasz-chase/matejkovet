<script lang="ts">
  import type { review } from "$lib/types/Review";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";

  export let supabase: any;
  let scrollingWrapper: HTMLElement;
  let reviews: review[] = [];
  let fetchError = null;

  async function loadData() {
    const { data: result, error } = await supabase
      .from("reviews")
      .select("*")
      .limit(20);
    if (error) {
      fetchError = error;
    }
    reviews = result;
  }

  onMount(() => {
    loadData();
    const scrollSpeed = 1; // Adjust this to change the scrolling speed
    const resetScrollPosition = () => {
      if (
        scrollingWrapper.scrollLeft >=
        scrollingWrapper.scrollWidth - scrollingWrapper.clientWidth
      ) {
        scrollingWrapper.scrollLeft = 0;
      }
    };

    const scrollInterval = setInterval(() => {
      scrollingWrapper.scrollLeft += scrollSpeed;
      resetScrollPosition();
    }, 100); // Adjust this to change the scrolling interval

    return () => {
      clearInterval(scrollInterval);
    };
  });
</script>

<div class="h-screen flex justify-center items-center w-full relative">
  <div class="flex overflow-x-auto no-scrollbar" bind:this={scrollingWrapper}>
    {#each reviews as review}
      <Card {review} />
    {/each}
  </div>
</div>
