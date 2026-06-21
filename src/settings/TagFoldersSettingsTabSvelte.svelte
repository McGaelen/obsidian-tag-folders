<script lang="ts">
  import type { App } from 'obsidian'
  import FolderExclusions from './FolderExclusions.svelte'
  import TagIcons from './TagIcons.svelte'

  const { app }: { app: App } = $props()
</script>

<FolderExclusions {app} />
<TagIcons {app} />
