<script lang="ts">
  import { DateInput } from "date-picker-svelte";
  let date = new Date();
</script>

<div class="w-full flex justify-center">
  <div>
    <h1>Umów wizytę</h1>
    <DateInput
      bind:value={date}
      min={new Date()}
      closeOnSelection
      format="yyyy-MM-dd"
    />
    <select class="select select-bordered w-full max-w-xs">
      <option disabled selected>Godzina wizyta</option>
      <option>9:00</option>
      <option>11:00</option>
      <option>12:00</option>
      <option>13:00</option>
      <option>14:00</option>
      <option>15:00</option>
      <option>16:00</option>
      <option>17:00</option>
      <option>18:00</option>
    </select>
    <div class="form-control">
      <label class="label" for="info">
        <span class="label-text">Dodatkowe uwagi</span>
      </label>
      <textarea
        name="info"
        class="textarea textarea-bordered h-24"
        placeholder="Uwagi"
      />
    </div>
  </div>
</div>
