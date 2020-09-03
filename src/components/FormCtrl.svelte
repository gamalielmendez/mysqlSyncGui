<script>
  export let label = "";
  export let placeholder = "";
  export let styles      = "";
  export let readonly    = false;
  export let type        = "text";
  export let value       = null;

  
</script>

<style>
  .formCtrlContainer {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
  }

  @media only screen and (max-width: 900px) {
    .formCtrlContainer {
      width: 100%;
    }
  }
</style>

<div class="formCtrlContainer" style={styles}>
  <label for="loctxt">{label}</label>
  {#if type === 'text'}
    <input
      type="text"
      class="form-control"
      id="loctxt"
      {readonly}
      {placeholder}
      bind:value={$value} />
  {:else if type === 'number'}
    <input
      type="number"
      class="form-control"
      id="loctxt"
      {readonly}
      {placeholder}
      bind:value={$value} />
  {:else if type === 'password'}
    <input
      type="password"
      class="form-control"
      id="loctxt"
      {readonly}
      {placeholder}
      bind:value={$value} />
  {/if}
</div>
