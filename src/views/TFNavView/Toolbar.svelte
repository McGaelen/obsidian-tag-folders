<script lang="ts">
  import NavHeader from '$lib/obsidian/file-tree-header/NavHeader.svelte'
  import NavButtonsContainer from '$lib/obsidian/file-tree-header/NavButtonsContainer.svelte'
  import NavActionButton from '$lib/obsidian/file-tree-header/NavActionButton.svelte'
  import { SquarePen } from '@lucide/svelte'
  import { Platform, TFile } from 'obsidian'
  import { selectedTag } from '$state/selectedTag.svelte'

  async function createFile() {
    const currentTag: string =
      typeof selectedTag.current !== 'symbol' && selectedTag.current !== null
        ? selectedTag.current
        : ''

    // Set up this listener before we actually fire the new-file command,
    // so once it's created, we immediately add the currently selected tag to the file.
    const ref = app.vault.on('create', file => {
      if (file instanceof TFile) {
        app.vault.modify(file, currentTag)
        app.vault.offref(ref)
      }
    })

    // @ts-expect-error This is NOT in the public API!!!
    app.commands.executeCommandById('file-explorer:new-file')
  }
</script>

<NavHeader>
  <NavButtonsContainer>
    <NavActionButton onclick={createFile}>
      <SquarePen size={Platform.isMobile ? 24 : 18} />
    </NavActionButton>
  </NavButtonsContainer>
</NavHeader>
