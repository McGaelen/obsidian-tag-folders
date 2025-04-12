<script lang="ts">
  import BaseTreeItem from '$lib/tree-item/BaseTreeItem.svelte'

  let props: {
    itemName?: string
    depth?: number
    onclick?: () => void
  } = $props()
</script>

<BaseTreeItem {...props} />
