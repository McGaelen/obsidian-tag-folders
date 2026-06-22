<script lang="ts">
  import Self from './TagTree.svelte'
  import TreeItemNavFolder from '$lib/obsidian/file-tree-list/TreeItemNavFolder.svelte'
  import { Hash } from '@lucide/svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'
  import { tags } from '$state/tags.svelte'
  import { selectedTag } from '$state/selectedTag.svelte'
  import { settings } from '$state/settings.svelte'
  import TagIconDisplay from '$lib/TagIconDisplay.svelte'

  const {
    tagTree,
    this_tag = '',
    depth = 0,
  }: {
    tagTree: { [key: string]: boolean | {} }
    this_tag?: string
    depth?: number
  } = $props()

  const subTags = $derived(
    Object.keys(tagTree).toSorted((a, b) => a.localeCompare(b)),
  )
</script>

{#each subTags as subTag (subTag)}
  {@const maybePseudoTag = this_tag + (depth === 0 ? '#' : '/') + subTag}
  {@const children = tagTree[subTag]}
  {@const TreeItemComponent =
    typeof children !== 'boolean' ? TreeItemNavFolder : TreeItemNavFile}

  <TreeItemComponent
    {depth}
    isActive={selectedTag.current === maybePseudoTag}
    onclick={() => (selectedTag.current = maybePseudoTag)}
  >
    {#snippet label()}
      {@const icon = settings.current.icons[maybePseudoTag]}
      <div class="flex items-center">
        {#if icon}
          <TagIconDisplay {icon} />
        {:else}
          <Hash size={16} class="text-(--nav-tag-color) mr-0.5 min-w-[16px]" />
        {/if}
        {subTag}
      </div>
    {/snippet}

    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.get(maybePseudoTag)?.size ?? 0}
      </div>
    {/snippet}

    {#if typeof children !== 'boolean'}
      <Self tagTree={children} this_tag={maybePseudoTag} depth={depth + 1} />
    {/if}
  </TreeItemComponent>
{/each}
