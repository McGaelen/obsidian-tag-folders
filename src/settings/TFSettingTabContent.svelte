<script lang="ts">
  import type { App } from 'obsidian'
  import FolderExclusionsSetting from './FolderExclusionsSetting.svelte'
  import TagIconsSetting from './TagIconsSetting.svelte'

  const { app }: { app: App } = $props()
</script>

<FolderExclusionsSetting {app} />
<TagIconsSetting {app} />
