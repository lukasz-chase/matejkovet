<script lang="ts">
  export let options: number[];
  export let userSelected = options[0];
</script>

<div class="py-4 flex flex-col">
  <h2>Na ile oceniasz usługę?</h2>
  <div class="rating">
    {#each options as _, i}
      <input
        type="radio"
        name={`rating-${i}`}
        class="mask mask-star-2 bg-accent"
        bind:group={userSelected}
        value={i}
      />
    {/each}
  </div>
</div>
