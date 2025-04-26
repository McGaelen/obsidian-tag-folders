<script lang="ts">
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()
</script>

<div class="nav-files-container node-insert-event">
  <div>
    {@render children?.()}
  </div>
</div>
