<script lang="ts">
  import NavFilesContainer from '$lib/obsidian/file-tree-list/NavFilesContainer.svelte'
  import Toolbar from './Toolbar.svelte'
  import TagTree from './TagTree.svelte'
  import { set } from 'lodash-es'
  import {
    taggedFiles,
    filteredFiles,
    tags,
    untaggedFiles,
  } from '$state/tags.svelte'
  import { selectedTag } from '$state/selectedTag.svelte'
  import TreeItemNavFile from '$lib/obsidian/file-tree-list/TreeItemNavFile.svelte'
  import type { TFile } from 'obsidian'
  import { Asterisk, Inbox, Funnel } from '@lucide/svelte'

  const tagTree = $derived(
    tags
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

    const set = tags.get(selectedTag.current)
    if (!set) return []

    // Apply sorting
    // TODO: support more sorting options
    // noinspection UnnecessaryLocalVariableJS
    const sorted = Array.from(set).toSorted(
      (a, b) => b.stat.mtime - a.stat.mtime,
    )

    return sorted
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

<Toolbar />

<NavFilesContainer>
  <TreeItemNavFile
    onclick={() => (selectedTag.current = taggedFiles)}
    isActive={selectedTag.current === taggedFiles}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Asterisk size={16} class="text-(--nav-tag-color)"></Asterisk>
        Tagged
      </div>
    {/snippet}
    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.get(taggedFiles)?.size ?? 0}
      </div>
    {/snippet}
  </TreeItemNavFile>

  <TreeItemNavFile
    onclick={() => (selectedTag.current = untaggedFiles)}
    isActive={selectedTag.current === untaggedFiles}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Inbox size={16} class="text-(--nav-tag-color)"></Inbox>
        Untagged
      </div>
    {/snippet}
    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.get(untaggedFiles)?.size ?? 0}
      </div>
    {/snippet}
  </TreeItemNavFile>

  <TreeItemNavFile
    onclick={() => (selectedTag.current = filteredFiles)}
    isActive={selectedTag.current === filteredFiles}
  >
    {#snippet label()}
      <div class="flex items-center">
        <Funnel size={16} class="text-(--nav-tag-color)"></Funnel>
        Filtered
      </div>
    {/snippet}
    {#snippet navFileTag()}
      <div style:font-size="var(--font-ui-smaller)">
        {tags.get(filteredFiles)?.size ?? 0}
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
