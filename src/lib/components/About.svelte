<script lang="ts">
  import {
    Icon,
    ArrowRight,
    Heart,
    LightBulb,
    RectangleStack,
  } from "svelte-hero-icons";
</script>

<div class="lg:h-screen flex justify-center items-center p-4">
  <div
    class="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-2 h-full items-center justify-center max-w-6xl overflow-hidden"
  >
    <div
      class="h-full min-h-[25vh] w-30 bg-primary-content text-base-100 flex items-start justify-center flex-col gap-2 p-4"
    >
      <span class="text-lg md:text-2xl xl:text-3xl"
        >Poznaj mnie, oraz moje zwierzaki</span
      >
      <Icon
        src={ArrowRight}
        mini
        class="h-5 w-5 md:h-10 md:w-10 xl:w-20 xl:h-20"
      />
    </div>
    <div
      class="h-full max-w-md min-h-[25vh] text-primary-content flex items-center justify-center flex-col gap-2 p-4"
    >
      <Icon src={Heart} mini class="h-5 w-5 md:h-10" />
      <span class="text-lg text-center"
        >Zaopiekuje się twoim zwierzakiem tak jak opiekuje się własnymi. Możesz
        być pewny najlepszej opieki</span
      >
    </div>
    <img
      src={"/czarny.png"}
      alt="czarny kot"
      class="w-1/2 lg:w-full h-full md:h-full object-contain"
    />
    <div
      class="h-full max-w-md min-h-[25vh] text-primary-content flex items-center justify-center flex-col gap-2 p-4"
    >
      <Icon src={LightBulb} mini class="h-5 w-5 md:h-10" />
      <span class="text-lg text-center"
        >Ukończyłam jedną z nalepszych szkół weterynaryjnych na świece, mam
        wieloletnie doświadczenie weterynaryjne</span
      >
    </div>
    <img
      src={"/duka.png"}
      alt="zdjecie psa"
      class="w-1/2 lg:w-full h-full object-contain"
    />
    <div
      class="md:h-full max-w-md min-h-[25vh] text-primary-content flex items-center justify-center flex-col gap-2 p-4"
    >
      <Icon src={RectangleStack} mini class="h-5 w-5 md:h-10" />
      <span class="text-lg text-center"
        >Na stronie możesz umówić się na wizytę, oraz zobaczyć poprzednie wizyty</span
      >
    </div>
  </div>
</div>
