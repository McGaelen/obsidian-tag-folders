<script lang="ts">
  import NavFilesContainer from '$lib/obsidian/file-tree-list/NavFilesContainer.svelte'
  import TagFolders from '$lib/tag-folders/TagFolders.svelte'
  import { tagFolderCache } from '$lib/tagFolderCache.svelte'
  import { ItemView } from 'obsidian'
  import Toolbar from '$lib/tag-folders/Toolbar.svelte'
</script>

<Toolbar />

<NavFilesContainer>
  <TagFolders tagFolder={tagFolderCache.root} />
</NavFilesContainer>
