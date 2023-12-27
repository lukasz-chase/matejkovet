<div
  class="h-[70vh] md:h-screen mb-[-32px] w-full grid items-center place-items-center relative z-0 border-b-2 border-primary"
>
  <div
    class="sticky z-10 top-0 h-[25vh] flex flex-col text-center gap-4 pt-16 tracking-widest"
  >
    <h2 class="text-lg xl:text-xl tracking-widest">Klinika weterynaryjna</h2>
    <h1 class="text-5xl xl:text-7xl tracking-widest">Matejkovet</h1>
  </div>
  <img
    src="duka-head.png"
    alt="glowa psa"
    class="scrolling w-1/2 md:w-2/6 self-end"
  />
</div>

<style>
  .scrolling {
    animation: scroll-down linear;
    animation-timeline: view();
    animation-range: 400px;
    scale: 1;
  }
  @keyframes scroll-down {
    to {
      transform: translateY(100%);
      scale: 1.5;
    }
  }
  @media (min-width: 768px) {
    @keyframes scroll-down {
      to {
        transform: translateY(100%);
        scale: 2.5;
      }
    }
  }
</style>
