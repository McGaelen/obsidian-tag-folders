<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    name,
    desc,
    control,
  }: { name?: string; desc?: string; control?: Snippet } = $props()
</script>

<div class="setting-item">
  <div class="setting-item-info">
    <div class="setting-item-name">
      {name}
    </div>

    <div class="setting-item-description">
      {desc}
    </div>
  </div>

  <div class="setting-item-control">
    {@render control?.()}
  </div>
</div>
