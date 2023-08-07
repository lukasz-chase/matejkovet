<script lang="ts">
  import { text } from "@sveltejs/kit";
  import { onMount } from "svelte";

  let y: number = 0;
  let scale: number = 1;
  let mobileImagePlacement: number = 0;
  let stopPoint: number;
  let isMobile: boolean = false;
  let container: HTMLElement;
  let textContainer: HTMLElement;
  let imgContainer: HTMLElement;

  onMount(() => {
    isMobile = window.innerWidth <= 768;

    stopPoint = container.clientHeight - textContainer.clientHeight;

    if (isMobile) {
      scale = 1.5;
      mobileImagePlacement =
        container.clientHeight - imgContainer.clientHeight * 1.2;
    }
  });

  $: {
    let scaleValue = y / stopPoint;
    scale = isMobile
      ? 1.5 + Math.min(Math.max(scaleValue, 0), 1) * 1
      : 1 + Math.min(Math.max(scaleValue, 0), 1) * 1;
  }
</script>

<svelte:window bind:scrollY={y} />
<div
  bind:this={container}
  class="h-[calc(100vh-3.9rem)] md:h-[calc(100vh-6.4rem)] flex justify-center overflow-hidden relative border-b-2 border-primary"
>
  <div
    bind:this={textContainer}
    style={`${
      y <= stopPoint
        ? `transform: translate3d(0px, ${y}px, 0px)`
        : `transform: translate3d(0px, ${stopPoint}px, 0px)`
    }`}
    class="h-[25vh] flex flex-col text-center gap-4 pt-16 tracking-widest"
  >
    <h2 class="text-lg xl:text-xl tracking-widest">Klinika weterynaryjna</h2>
    <h1 class="z-10 text-5xl xl:text-7xl tracking-widest">Matejkovet</h1>
  </div>
  <img
    bind:this={imgContainer}
    src="duka-head.png"
    alt="glowa psa"
    style={`transform: translate3d(0px, ${
      isMobile ? mobileImagePlacement + y : y
    }px, 0px) scale(${scale})`}
    class={`absolute z-0 self-center ${
      isMobile ? "scale-150" : "md:scale-105"
    } transition-all ease-linear duration-0`}
  />
</div>
