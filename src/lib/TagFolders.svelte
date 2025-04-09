<script lang="ts">
  import Self from './TagFolders.svelte'
  // noinspection ES6UnusedImports
  import * as Collapsible from '$lib/shadcn/ui/collapsible'
  import { Button } from '$lib/shadcn/ui/button'
  import { ChevronRight } from 'lucide-svelte'
  import { cn } from '$lib/shadcn/utils'

  let {
    tagFolder,
    name,
    isSubTag,
  }: { tagFolder: TagFolder; name?: string; isSubTag?: boolean } = $props()

  let isExpanded = $state(false)
</script>

{#if isSubTag}
  <Collapsible.Root bind:open={isExpanded}>
    <Collapsible.Trigger asChild let:builder>
      <div class="item-container">
        <Button builders={[builder]} class="w-full !justify-start">
          <ChevronRight
            class="tree-item-icon collapse-icon transition {cn([
              { 'rotate-90': isExpanded },
            ])}"
            style="width: var(--size-4-4); opacity: var(--icon-opacity); color: var(--nav-collapse-icon-color);"
            strokeWidth="2px"
          />
          {name}
        </Button>
      </div>
    </Collapsible.Trigger>
    <Collapsible.Content>
      {@render childFoldersAndFiles()}
    </Collapsible.Content>
  </Collapsible.Root>
{:else}
  <!-- The top level TagFolder shouldn't be in a collapse. -->
  {@render childFoldersAndFiles()}
{/if}

{#snippet childFoldersAndFiles()}
  <div class={[isSubTag && 'line-guide ml-5']}>
    {#if tagFolder.subTags}
      {#each Object.entries(tagFolder.subTags) as [tagName, subTagFolder]}
        <Self name={tagName} tagFolder={subTagFolder} isSubTag />
      {/each}
    {/if}

    {#each tagFolder.files as file}
      <div class="item-container">
        <Button class="!pl-7 w-full !justify-start">{file.name}</Button>
      </div>
    {/each}
  </div>
{/snippet}

<style>
  @reference '../styles.css';

  .line-guide {
    border-left: var(--nav-indentation-guide-width) solid
      var(--nav-indentation-guide-color);
  }

  .item-container :global([type='button']) {
    height: 25px;
    background-color: transparent;
    border: none;
    box-shadow: none;
    text-overflow: ellipsis;
    color: var(--nav-item-color);
    &:hover {
      color: var(--nav-item-color-hover);
      background-color: var(--nav-item-background-hover);
      font-weight: var(--nav-item-weight-hover);
    }
  }
</style>
