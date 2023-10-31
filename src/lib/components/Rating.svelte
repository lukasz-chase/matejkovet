<script lang="ts">
  import type { Review } from "$lib/types/Review";
  import { onMount } from "svelte";
  import { Carousel } from "flowbite-svelte";
  import { slide } from "svelte/transition";
  import CarouselBottom from "./CarouselBottom.svelte";

  export let supabase: any;
  let images: any;
  let reviews: Review[] = [];
  let review: Review | null = null;

  async function loadData() {
    const { data: results } = await supabase
      .from("reviews")
      .select("*")
      .limit(40);

    reviews = results;

    images = results.map((result: Review) => ({
      ...result,
      alt: result.name,
      src: result.photoURL,
      title: result.name,
    }));
    review = images[0];
  }

  onMount(loadData);
</script>

{#if images}
  <div
    class="h-full py-20 w-full flex justify-center items-center border-y-2 border-primary"
  >
    <div
      class="max-w-4xl w-full h-full flex flex-col gap-10 justify-center items-center"
    >
      <h1 class="text-2xl text-accent">Poznaj opinie naszych gości</h1>
      <div>
        <Carousel
          {images}
          duration={3000}
          transition={slide}
          imgClass="object-contain"
          class="justify-self-center self-center"
          on:change={({ detail }) => (review = detail)}
        />
        <CarouselBottom {review} />
      </div>
    </div>
  </div>
{:else}
  <div class="h-screen w-full flex justify-center items-center">
    <span class="loading loading-infinity loading-lg" />
  </div>
{/if}
