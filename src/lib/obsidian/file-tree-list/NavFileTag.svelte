<script lang="ts">
  let { tag }: { tag?: string } = $props()
</script>

{#if tag}
  <div class="nav-file-tag">
    {tag}
  </div>
{/if}
