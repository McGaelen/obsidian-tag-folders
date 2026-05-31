<script lang="ts">
  import BaseTreeItem from '$lib/obsidian/file-tree-list/BaseTreeItem.svelte'
  import type { Snippet } from 'svelte'

  let props: {
    depth?: number
    onclick?: () => void
    navFileTag?: Snippet
    children?: Snippet
  } = $props()
</script>

<BaseTreeItem {...props} />
