<script lang="ts">
  import type { Snippet } from 'svelte'

  let {heading, children}: {heading?: string; children?: Snippet} = $props()
</script>

<div class="setting-group">
  <div class="setting-item setting-item-heading">{heading}</div>
  <div class="setting-items">
    {@render children?.()}
  </div>
</div>
