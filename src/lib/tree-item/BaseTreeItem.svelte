<script lang="ts">
  import { ChevronRight } from 'lucide-svelte'

  let {
    itemName,
    isFolder,
    depth = 0,
    onclick,
  }: {
    itemName?: string
    isFolder?: boolean
    depth?: number
    onclick?: () => void
  } = $props()
</script>

<div class={['tree-item', isFolder ? 'nav-folder' : 'nav-file']}>
  <!-- Obsidian is clearly using click handlers on a <div>, so we do it as well to match. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class={[
      'tree-item-self is-clickable',
      isFolder ? 'nav-folder-title mod-collapsible' : 'nav-file-title tappable',
    ]}
    style="margin-inline-start: -{25 * depth}px; padding-inline-start: {25 *
      depth +
      25}px;"
    {onclick}
  >
    {#if isFolder}
      <div class="tree-item-icon collapse-icon">
        <ChevronRight />
      </div>
    {/if}
    <div
      class={[
        'tree-item-inner',
        isFolder ? 'nav-folder-title-content' : 'nav-file-title-content',
      ]}
    >
      {itemName}
    </div>
  </div>
</div>
