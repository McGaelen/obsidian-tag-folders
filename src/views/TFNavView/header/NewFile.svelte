<script lang="ts">
  import { Platform, TFile } from 'obsidian'
  import NavActionButton from '$lib/obsidian/file-tree-header/NavActionButton.svelte'
  import { SquarePen } from '@lucide/svelte'
  import { settings } from '$state/settings.svelte'

  async function createFile() {
    const { selectedTag } = settings.current

    const currentTag: string =
      typeof selectedTag !== 'number' && selectedTag !== null
        ? selectedTag
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

<NavActionButton onclick={createFile}>
  <SquarePen size={Platform.isMobile ? 24 : 18} />
</NavActionButton>
