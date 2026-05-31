<script lang="ts">
  import * as Collapsible from '$lib/shadcn/ui/collapsible'
  import type { Snippet } from 'svelte'
  import BaseTreeItem from '$lib/obsidian/file-tree-list/BaseTreeItem.svelte'

  let {
    depth = 0,
    onselect,
    label,
    navFileTag,
    children,
  }: {
    depth?: number
    onselect?: () => void
    label?: Snippet
    navFileTag?: Snippet
    children?: Snippet
  } = $props()

  let isExpanded = $state(false)
</script>

<Collapsible.Root bind:open={isExpanded} onclick={onselect}>
  <BaseTreeItem
    isFolder
    {isExpanded}
    {depth}
    onclick={() => (isExpanded = !isExpanded)}
    {label}
    {navFileTag}
  />
  <Collapsible.Content>
    <div class="tree-item-children nav-folder-children">
      <div style="width: 310px; height: 0.1px; margin-bottom: 0px;"></div>
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
