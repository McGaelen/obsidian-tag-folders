<script lang="ts">
  import NavFilesContainer from '$lib/tree-item/NavFilesContainer.svelte'
  import TagFolders from '$lib/tag-folders/TagFolders.svelte'

  let { tagFolder }: { tagFolder: TagFolder } = $props()
</script>

<NavFilesContainer>
  <TagFolders {tagFolder} />
</NavFilesContainer>
