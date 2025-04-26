<script lang="ts">
  import NavHeader from '$lib/nav/NavHeader.svelte'
  import NavButtonsContainer from '$lib/nav/NavButtonsContainer.svelte'
  import NavActionButton from '$lib/nav/NavActionButton.svelte'
  import { Edit } from 'lucide-svelte'
  import { getContext } from 'svelte'
  import type { App } from 'obsidian'

  const app = getContext<App>('app')

  function createFile() {
    // @ts-expect-error This is NOT in the public API!!!
    app.commands.executeCommandById('file-explorer:new-file')
  }
</script>

<NavHeader>
  <NavButtonsContainer>
    <NavActionButton onclick={createFile}>
      <Edit size={18} />
    </NavActionButton>
  </NavButtonsContainer>
</NavHeader>
