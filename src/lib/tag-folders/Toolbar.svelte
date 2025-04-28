<script lang="ts">
  import NavHeader from '$lib/obsidian/file-tree-header/NavHeader.svelte'
  import NavButtonsContainer from '$lib/obsidian/file-tree-header/NavButtonsContainer.svelte'
  import NavActionButton from '$lib/obsidian/file-tree-header/NavActionButton.svelte'
  import { Edit } from 'lucide-svelte'
  import { getContext } from 'svelte'
  import { type App, Platform } from 'obsidian'

  const app = getContext<App>('app')

  function createFile() {
    // @ts-expect-error This is NOT in the public API!!!
    app.commands.executeCommandById('file-explorer:new-file')
  }
</script>

<NavHeader>
  <NavButtonsContainer>
    <NavActionButton onclick={createFile}>
      <Edit size={Platform.isMobile ? 24 : 18} />
    </NavActionButton>
  </NavButtonsContainer>
</NavHeader>
