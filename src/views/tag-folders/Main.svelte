<script lang="ts">
  import NavFilesContainer from '$lib/obsidian/file-tree-list/NavFilesContainer.svelte'
  import Toolbar from './Toolbar.svelte'
  import TagTree from './TagTree.svelte'
  import { set } from 'lodash-es'
  import { selectedTag, tags } from './tags.svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'
  import { getContext } from 'svelte'
  import type { App } from 'obsidian'

  const app: App = getContext('app')

  const tagTree = $derived(
    tags.keys().reduce((acc, current) => {
      // slice(1) will remove the leading slash, so it isn't replaced with a "."
      const objectPath = current.slice(1).replaceAll('/', '.')
      return set(acc, objectPath, true)
    }, {}),
  )

  const files = $derived(tags.get(selectedTag.current))
</script>

<Toolbar />

<NavFilesContainer>
  <TagTree {tagTree} />
  <div class="bg-(--divider-color) h-px w-full mb-[2px]"></div>
  {#each files as file}
    <TreeItemNavFile onclick={() => app.workspace.getLeaf().openFile(file)}>
      {#snippet label()}
        {file.name}
      {/snippet}
    </TreeItemNavFile>
  {/each}
</NavFilesContainer>
