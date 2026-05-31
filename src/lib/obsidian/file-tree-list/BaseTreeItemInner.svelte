<script lang="ts">
  import type { Snippet } from 'svelte'
  import NavFileTag from '$lib/obsidian/file-tree-list/NavFileTag.svelte'

  let {
    isFolder,
    label,
    navFileTag,
  }: { isFolder?: boolean; label?: Snippet; navFileTag?: Snippet } = $props()
</script>

<div
  class={[
    'tree-item-inner',
    isFolder ? 'nav-folder-title-content' : 'nav-file-title-content',
  ]}
>
  {@render label?.()}
</div>

<NavFileTag children={navFileTag} />
