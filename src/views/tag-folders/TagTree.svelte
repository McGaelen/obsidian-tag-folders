<script lang="ts">
  import Self from './TagTree.svelte'
  import TreeItemNavFolder from '$lib/obsidian/file-tree-list/TreeItemNavFolder.svelte'
  import { Hash } from '@lucide/svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'
  import { selectedTag, tags } from './tags.svelte'

  const {
    tagTree,
    this_tag = '',
    depth = 0,
  }: {
    tagTree: { [key: string]: boolean | {} }
    this_tag?: string
    depth?: number
  } = $props()
</script>

{#each Object.keys(tagTree) as subTag (subTag)}
  {@const maybePseudoTag = this_tag + '/' + subTag}
  {@const children = tagTree[subTag]}
  {@const TreeItemComponent =
    typeof children !== 'boolean' ? TreeItemNavFolder : TreeItemNavFile}

  <TreeItemComponent
    {depth}
    isActive={selectedTag.current === maybePseudoTag}
    onclick={() => (selectedTag.current = maybePseudoTag)}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Hash size={16} class="text-(--nav-tag-color) mr-0.5 min-w-[16px]" />
        {subTag}
      </div>
    {/snippet}

    {#snippet navFileTag()}
      {tags.get(maybePseudoTag)?.length ?? ''}
    {/snippet}

    {#if typeof children !== 'boolean'}
      <Self tagTree={children} this_tag={maybePseudoTag} depth={depth + 1} />
    {/if}
  </TreeItemComponent>
{/each}
