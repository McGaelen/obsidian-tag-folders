<script lang="ts">
  import '../../styles.css'
  import Self from './TagFolders.svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'
  import TreeItemNavFolder from '$lib/obsidian/file-tree-list/TreeItemNavFolder.svelte'
  import { type App, type TFile } from 'obsidian'
  import { getContext } from 'svelte'

  const app = getContext<App>('app')

  let {
    tagFolder,
    name,
    depth = 0,
  }: { tagFolder: TagFolder; name?: string; depth?: number } = $props()

  // prettier-ignore
  let sortedSubTags: Array<[string, TagFolder]> = $derived(
    Object.entries(tagFolder.subTags ?? {}).slice().sort(
        ([tagA], [tagB]) => tagA.localeCompare(tagB),
    ),
  )

  let sortedFiles: TFile[] = $derived(
    tagFolder.files?.slice().sort((a, b) => a.name.localeCompare(b.name)) ?? [],
  )

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
  {#each sortedSubTags as [tagName, subTagFolder] (tagName)}
    <Self name={tagName} tagFolder={subTagFolder} depth={depth + 1} />
  {/each}

  <!-- List the files under this tag -->
  {#each sortedFiles as file (file.path)}
    <TreeItemNavFile
      itemName={file.name}
      {depth}
      onclick={() => openFile(file)}
    />
  {/each}
{/snippet}
