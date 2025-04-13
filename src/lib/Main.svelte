<script lang="ts">
  import NavFilesContainer from '$lib/tree-item/NavFilesContainer.svelte'
  import TagFolders from '$lib/tag-folders/TagFolders.svelte'
  import { tagFolderCache } from '$lib/tagFolderCache.svelte'
</script>

<div class="h-[42px]"></div>

<NavFilesContainer>
  <TagFolders tagFolder={tagFolderCache.root} />
</NavFilesContainer>
