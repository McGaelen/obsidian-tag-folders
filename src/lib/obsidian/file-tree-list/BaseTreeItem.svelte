<script lang="ts">
  import FolderChevron from '$lib/svg/FolderChevron.svelte'
  import BaseTreeItemInner from '$lib/obsidian/file-tree-list/BaseTreeItemInner.svelte'
  import { CollapsibleTrigger } from '$lib/shadcn/ui/collapsible'
  import type { Snippet } from 'svelte'

  let {
    isFolder,
    isExpanded,
    depth = 0,
    onclick,
    label,
    navFileTag,
  }: {
    isFolder?: boolean
    isExpanded?: boolean
    depth?: number
    onclick?: () => void
    label?: Snippet
    navFileTag?: Snippet
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
      'tree-item-self is-clickable items-center!',
      isFolder ? 'nav-folder-title mod-collapsible' : 'nav-file-title tappable',
    ]}
    style="margin-inline-start: {margin}px !important; padding-inline-start: {padding}px !important;"
    onclick={isFolder ? undefined : onclick}
  >
    {#if isFolder}
      <CollapsibleTrigger>
        {#snippet child()}
          <!-- Obsidian is clearly using click handlers on a <div>, so we do it as well to match. -->
          <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
          <div
            class="tree-item-icon collapse-icon"
            onclick={isFolder
              ? e => {
                  e.stopPropagation()
                  onclick?.()
                }
              : undefined}
          >
            <FolderChevron {isExpanded} />
          </div>
        {/snippet}
      </CollapsibleTrigger>
    {/if}

    <BaseTreeItemInner {isFolder} {label} {navFileTag} />
  </div>
</div>
