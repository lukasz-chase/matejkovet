<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  let mapElement;
  let map;

  onMount(async () => {
    if (browser) {
      const leaflet = await import("leaflet");

      map = leaflet.map(mapElement).setView([50.0247372, 19.3387511], 13);

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
        .addTo(map);

      leaflet
        .marker([50.0247372, 19.342])
        .addTo(map)
        .bindPopup("Matejkovet")
        .openPopup();
    }
    document.getElementsByClassName(
      "leaflet-control-attribution"
    )[0].style.display = "none";
  });

  onDestroy(async () => {
    if (map) {
      map.remove();
    }
  });
</script>

<main>
  <div class="h-96 w-96" bind:this={mapElement} />
</main>

<style>
  @import "leaflet/dist/leaflet.css";
</style>
