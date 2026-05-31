<script lang="ts">
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()
</script>

{#if children}
  <div class="nav-file-tag">
    {@render children?.()}
  </div>
{/if}
