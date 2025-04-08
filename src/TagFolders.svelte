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
    <div class="item">{name}</div>
  {/if}

  <div style="padding-inline-start: {isSubTag ? '20px' : '0px'}">
    {#if tagFolder.subTags}
      {#each Object.entries(tagFolder.subTags) as [tagName, subTagFolder]}
        <Self name={tagName} tagFolder={subTagFolder} isSubTag />
      {/each}
    {/if}

    {#each tagFolder.files as file}
      <div class="item">{file.name}</div>
    {/each}
  </div>
</div>

<style>
  .item {
    white-space: nowrap;
    height: 24px;
    display: flex;
    align-items: center;
    border-radius: var(--radius-s);
    cursor: var(--cursor);
    color: var(--nav-item-color);
    font-size: var(--nav-item-size);
    font-weight: var(--nav-item-weight);
    line-height: var(--line-height-tight);
  }
  .item:hover {
    color: var(--nav-item-color-hover);
    background-color: var(--nav-item-background-hover);
    font-weight: var(--nav-item-weight-hover);
  }
</style>
