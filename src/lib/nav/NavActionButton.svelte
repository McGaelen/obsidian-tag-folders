<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    onclick,
    children,
  }: { onclick?: HTMLDivElement['onclick']; children?: Snippet } = $props()
</script>

<div class="clickable-icon nav-action-button" {onclick}>
  {@render children?.()}
</div>
