<script lang="ts">
  export let showModal: boolean;

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) dialog.showModal();
  const closeModal = () => {
    dialog.close();
    showModal = false;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  class="modal modal-bottom sm:modal-middle"
  bind:this={dialog}
  on:close={closeModal}
  on:click|self={closeModal}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="modal-box">
    <button
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      on:click={() => dialog.close()}>✕</button
    >
    <slot name="header" />
    <slot />
  </div>
</dialog>
