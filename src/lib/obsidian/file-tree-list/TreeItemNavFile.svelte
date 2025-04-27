<script lang="ts">
  import BaseTreeItem from '$lib/obsidian/file-tree-list/BaseTreeItem.svelte'

  let props: {
    itemName?: string
    depth?: number
    onclick?: () => void
  } = $props()
</script>

<BaseTreeItem {...props} />
