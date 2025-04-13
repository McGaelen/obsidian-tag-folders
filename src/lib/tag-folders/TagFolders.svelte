<script lang="ts">
  import '../../styles.css'
  import Self from './TagFolders.svelte'
  import TreeItemNavFile from '$lib/tree-item/TreeItemNavFile.svelte'
  import TreeItemNavFolder from '$lib/tree-item/TreeItemNavFolder.svelte'
  import { type App, type TFile } from 'obsidian'
  import { getContext } from 'svelte'

  const app = getContext<App>('app')

  let {
    tagFolder,
    name,
    depth = 0,
  }: { tagFolder: TagFolder; name?: string; depth?: number } = $props()

  function openFile(file: TFile) {
    app.workspace.getLeaf().openFile(file)
  }
</script>

{#if depth}
  <TreeItemNavFolder folderName={name} depth={depth - 1}>
    {@render childFoldersAndFiles()}
  </TreeItemNavFolder>
{:else}
  <!-- The top level TagFolder shouldn't be in a collapse. -->
  {@render childFoldersAndFiles()}
{/if}

{#snippet childFoldersAndFiles()}
  <!-- List all subtags first -->
  {#if tagFolder.subTags}
    {#each Object.entries(tagFolder.subTags) as [tagName, subTagFolder]}
      <Self name={tagName} tagFolder={subTagFolder} depth={depth + 1} />
    {/each}
  {/if}

  <!-- List the files under this tag -->
  {#each tagFolder.files as file}
    <TreeItemNavFile
      itemName={file.name}
      {depth}
      onclick={() => openFile(file)}
    />
  {/each}
{/snippet}
