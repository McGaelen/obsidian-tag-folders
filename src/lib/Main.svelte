<script lang="ts">
  import NavFilesContainer from '$lib/obsidian/file-tree-list/NavFilesContainer.svelte'
  import TagFolders from '$lib/tag-folders/TagFolders.svelte'
  import { tagFolderCache } from '$lib/tagFolderCache.svelte'
  import Toolbar from '$lib/tag-folders/Toolbar.svelte'
  import { selectedTag } from '$lib/selectedTag.svelte'


  $effect(() => {
    console.log(selectedTag.current)
  })
</script>

<Toolbar />

<NavFilesContainer>
  <div class="grid h-full" style:grid-template-columns="1fr 200px">
    <div class="overflow-y-auto">
      <TagFolders tagFolder={tagFolderCache.current} />
    </div>
    <div>hi</div>
  </div>
</NavFilesContainer>
