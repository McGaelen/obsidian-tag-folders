<script lang="ts">
  import '../styles.css'
  import Self from './TagFolders.svelte'
  import { Button } from '$lib/shadcn/ui/button'
  import ExpandableFolder from '$lib/file-tree/ExpandableFolder.svelte'

  let {
    tagFolder,
    name,
    isSubTag,
  }: { tagFolder: TagFolder; name?: string; isSubTag?: boolean } = $props()
</script>

{#if isSubTag}
  <ExpandableFolder folderName={name}>
    {@render childFoldersAndFiles()}
  </ExpandableFolder>
{:else}
  <!-- The top level TagFolder shouldn't be in a collapse. -->
  {@render childFoldersAndFiles()}
{/if}

{#snippet childFoldersAndFiles()}
  <!-- List all subtags first -->
  {#if tagFolder.subTags}
    {#each Object.entries(tagFolder.subTags) as [tagName, subTagFolder]}
      <Self name={tagName} tagFolder={subTagFolder} isSubTag />
    {/each}
  {/if}

  <!-- List the files under this tag -->
  {#each tagFolder.files as file}
    <Button class="!pl-7 w-full !justify-start !file-tree-item">
      {file.name}
    </Button>
  {/each}
{/snippet}
