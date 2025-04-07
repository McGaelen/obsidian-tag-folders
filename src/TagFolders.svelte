<script lang="ts">
  import Self from './TagFolders.svelte'

  let {
    tagFolder,
    name,
    isSubTag,
  }: { tagFolder: TagFolder; name?: string; isSubTag?: boolean } = $props()
</script>

<div class={isSubTag ? 'tree-item nav-folder' : ''}>
  {#if name}
    <div class="tree-item-self nav-folder-title is-clickable mod-collapsible">
      {name}
    </div>
  {/if}

  <div class="tree-item-children nav-folder-children">
    {#if tagFolder.subTags}
      {#each Object.entries(tagFolder.subTags) as [tagName, subTagFolder]}
        <Self name={tagName} tagFolder={subTagFolder} isSubTag />
      {/each}
    {/if}

    {#each tagFolder.files as file}
      <div class="tree-item nav-file">
        <div
          class="tree-item-self nav-file-title tappable is-clickable"
          style="padding-inline-start: {isSubTag ? '20px' : '0px'}"
        >
          {file}
        </div>
      </div>
    {/each}
  </div>
</div>
