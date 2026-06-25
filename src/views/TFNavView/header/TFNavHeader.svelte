<script lang="ts">
  import NavHeader from '$lib/obsidian/file-tree-header/NavHeader.svelte'
  import NavButtonsContainer from '$lib/obsidian/file-tree-header/NavButtonsContainer.svelte'
  import NewFile from './NewFile.svelte'
  import SortBy from './SortBy.svelte'
</script>

<NavHeader>
  <NavButtonsContainer>
    <NewFile />
    <SortBy />
  </NavButtonsContainer>
</NavHeader>
