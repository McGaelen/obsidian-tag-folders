<script lang="ts">
  import NavFilesContainer from '$lib/obsidian/file-tree-list/NavFilesContainer.svelte'
  import TFNavHeader from './header/TFNavHeader.svelte'
  import TagTree from './TagTree.svelte'
  import { set } from 'lodash-es'
  import { Tags, tags } from '$state/tags.svelte'
  import { selectedTag } from '$state/selectedTag.svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'
  import type { TFile } from 'obsidian'
  import { Asterisk, Inbox, Funnel } from '@lucide/svelte'
  import { settings } from '$state/settings.svelte'
  import { SortOrder } from '$lib/enums/SortOrder'

  const tagTree = $derived(
    tags.current
      .keys()
      .filter(k => typeof k !== 'symbol')
      .reduce((acc, current) => {
        // slice(1) will remove the leading slash, so it isn't replaced with a "."
        const objectPath = current.slice(1).replaceAll('/', '.')
        return set(acc, objectPath, true)
      }, {}),
  )

  const files: TFile[] = $derived.by(() => {
    if (selectedTag.current === null) return []

    const set = tags.current.get(selectedTag.current)
    if (!set) return []

    // Apply sorting
    // TODO: support more sorting options
    // noinspection UnnecessaryLocalVariableJS
    const array = Array.from(set)

    switch (settings.current.sortOrder) {
      case SortOrder.filename_desc:
        return array.toSorted((a, b) => a.basename.localeCompare(b.basename))
      case SortOrder.filename_asc:
        return array.toSorted((a, b) => b.basename.localeCompare(a.basename))
      case SortOrder.mtime_desc:
        return array.toSorted((a, b) => b.stat.mtime - a.stat.mtime)
      case SortOrder.mtime_asc:
        return array.toSorted((a, b) => a.stat.mtime - b.stat.mtime)
      case SortOrder.ctime_desc:
        return array.toSorted((a, b) => b.stat.ctime - a.stat.ctime)
      case SortOrder.ctime_asc:
        return array.toSorted((a, b) => a.stat.ctime - b.stat.ctime)
      default:
        throw settings.current.sortOrder satisfies never
    }
  })

  let activeFile: TFile | null = $state(null)
  $effect(() => {
    const ref = app.workspace.on(
      'active-leaf-change',
      () => (activeFile = app.workspace.getActiveFile()),
    )
    return () => {
      app.workspace.offref(ref)
    }
  })
</script>

<TFNavHeader />

<NavFilesContainer>
  <TreeItemNavFile
    onclick={() => (selectedTag.current = Tags.taggedFiles)}
    isActive={selectedTag.current === Tags.taggedFiles}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Asterisk size={16} class="text-(--nav-tag-color)"></Asterisk>
        Tagged
      </div>
    {/snippet}
    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.current.get(Tags.taggedFiles)?.size ?? 0}
      </div>
    {/snippet}
  </TreeItemNavFile>

  <TreeItemNavFile
    onclick={() => (selectedTag.current = Tags.untaggedFiles)}
    isActive={selectedTag.current === Tags.untaggedFiles}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Inbox size={16} class="text-(--nav-tag-color)"></Inbox>
        Untagged
      </div>
    {/snippet}
    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.current.get(Tags.untaggedFiles)?.size ?? 0}
      </div>
    {/snippet}
  </TreeItemNavFile>

  <TreeItemNavFile
    onclick={() => (selectedTag.current = Tags.filteredFiles)}
    isActive={selectedTag.current === Tags.filteredFiles}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Funnel size={16} class="text-(--nav-tag-color)"></Funnel>
        Filtered
      </div>
    {/snippet}
    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.current.get(Tags.filteredFiles)?.size ?? 0}
      </div>
    {/snippet}
  </TreeItemNavFile>

  <TagTree {tagTree} />

  <div class="bg-(--divider-color) h-px w-full mb-[2px]"></div>
  {#each files as file}
    <TreeItemNavFile
      onclick={() => app.workspace.getLeaf().openFile(file)}
      isActive={activeFile === file}
    >
      {#snippet label()}
        {file.basename}
      {/snippet}
      {#snippet navFileTag()}
        {#if file.extension !== 'md'}
          {file.extension}
        {/if}
      {/snippet}
    </TreeItemNavFile>
  {/each}
</NavFilesContainer>
