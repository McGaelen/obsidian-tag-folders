<script lang="ts">
  import BaseTreeItem from '$lib/obsidian/file-tree-list/BaseTreeItem.svelte'
  import type { Snippet } from 'svelte'

  let props: {
    depth?: number
    isActive?: boolean
    onclick?: () => void
    label?: Snippet
    navFileTag?: Snippet
  } = $props()
</script>

<BaseTreeItem {...props} />
