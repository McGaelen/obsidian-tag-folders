<script lang="ts">
  import Self from './TagTree.svelte'
  import TreeItemNavFolder from '$lib/obsidian/file-tree-list/TreeItemNavFolder.svelte'
  import { Hash } from '@lucide/svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'

  const {
    this_tag = '',
    count,
    subTags,
    depth = 0,
  }: {
    this_tag?: string
    count?: number
    subTags: { [key: string]: boolean | {} }
    depth?: number
  } = $props()
</script>

{#each Object.keys(subTags) as subTag (subTag)}
  {@const children = subTags[subTag]}
  {@const TreeItemComponent =
    typeof children !== 'boolean' ? TreeItemNavFolder : TreeItemNavFile}

  <TreeItemComponent {depth}>
    {#snippet label()}
      <div class="flex items-center">
        <Hash size={16} class="text-(--nav-tag-color) mr-0.5 min-w-[16px]" />
        {subTag}
      </div>
    {/snippet}

    {#snippet navFileTag()}
      {#if count != undefined}
        {count}
      {/if}
    {/snippet}

    {#if typeof children !== 'boolean'}
      <Self
        subTags={children}
        this_tag="{this_tag}/{subTag}"
        depth={depth + 1}
      />
    {/if}
  </TreeItemComponent>
{/each}
