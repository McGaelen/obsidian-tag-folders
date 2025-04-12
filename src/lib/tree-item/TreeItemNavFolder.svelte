<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Collapsible from '$lib/shadcn/ui/collapsible'
  import type { Snippet } from 'svelte'
  import BaseTreeItem from '$lib/tree-item/BaseTreeItem.svelte'

  let {
    folderName,
    depth = 0,
    children,
  }: { folderName?: string; depth?: number; children?: Snippet } = $props()

  let isExpanded = $state(false)
</script>

<Collapsible.Root bind:open={isExpanded}>
  <Collapsible.Trigger asChild>
    <BaseTreeItem
      itemName={folderName}
      isFolder
      {depth}
      onclick={() => (isExpanded = !isExpanded)}
    />
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div class="tree-item-children nav-folder-children">
      <div style="width: 310px; height: 0.1px; margin-bottom: 0px;"></div>
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
