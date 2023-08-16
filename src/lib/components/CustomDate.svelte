<script lang="ts">
  const today = new Date();
  export let date: Date | string = today.toJSON().slice(0, 10);
  let nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  let maxDate = nextMonth.toJSON().slice(0, 10);
  let dateContainer: HTMLInputElement;
</script>

<input
  class="input input-bordered w-full mb-4 self-center"
  type="date"
  name="date"
  min={today.toJSON().slice(0, 10)}
  max={maxDate}
  bind:value={date}
  bind:this={dateContainer}
/>
