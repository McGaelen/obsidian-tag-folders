<script lang="ts">
  import FolderChevron from '$lib/svg/FolderChevron.svelte'

  let {
    itemName,
    isFolder,
    isExpanded,
    depth = 0,
    onclick,
  }: {
    itemName?: string
    isFolder?: boolean
    depth?: number
    isExpanded?: boolean
    onclick?: () => void
  } = $props()

  // These values control the width of the hover effect, which makes it cover the full width of the view
  let margin = $derived(-17 * depth)
  let padding = $derived(17 * depth + 24)
</script>

<div class={['tree-item', isFolder ? 'nav-folder' : 'nav-file']}>
  <!-- Obsidian is clearly using click handlers on a <div>, so we do it as well to match. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class={[
      'tree-item-self is-clickable',
      isFolder ? 'nav-folder-title mod-collapsible' : 'nav-file-title tappable',
    ]}
    style="margin-inline-start: {margin}px !important; padding-inline-start: {padding}px !important;"
    {onclick}
  >
    {#if isFolder}
      <div class="tree-item-icon collapse-icon">
        <FolderChevron {isExpanded} />
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
