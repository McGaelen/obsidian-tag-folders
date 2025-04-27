<script lang="ts">
  import NavFileTag from '$lib/obsidian/file-tree-list/NavFileTag.svelte'

  let { itemName, isFolder }: { itemName?: string; isFolder?: boolean } =
    $props()

  let { fileName, extension }: { fileName?: string; extension?: string } =
    $derived.by(() => {
      if (isFolder) {
        return { fileName: itemName }
      } else if (itemName) {
        const dotIdx = itemName.lastIndexOf('.')
        const fileName = itemName.slice(0, dotIdx)
        const extension = itemName.slice(dotIdx + 1) // to end of string
        return extension === 'md' ? { fileName } : { fileName, extension }
      } else {
        return { fileName: '' }
      }
    })
</script>

<div
  class={[
    'tree-item-inner',
    isFolder ? 'nav-folder-title-content' : 'nav-file-title-content',
  ]}
>
  {fileName}
</div>

{#if !isFolder}
  <NavFileTag tag={extension} />
{/if}
