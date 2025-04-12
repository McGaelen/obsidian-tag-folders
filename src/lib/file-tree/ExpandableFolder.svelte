<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Collapsible from '$lib/shadcn/ui/collapsible'
  import { Button } from '$lib/shadcn/ui/button'
  import FolderChevron from '$lib/svg/FolderChevron.svelte'
  import type { Snippet } from 'svelte'

  let { folderName, children }: { folderName?: string; children?: Snippet } =
    $props()

  let isExpanded = $state(false)
</script>

<Collapsible.Root bind:open={isExpanded}>
  <Collapsible.Trigger asChild let:builder>
    <Button builders={[builder]} class="w-full !justify-start !file-tree-item">
      <FolderChevron bind:isExpanded />
      {folderName}
    </Button>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <div class="border-indentation-guide ml-5">
      {@render children?.()}
    </div>
  </Collapsible.Content>
</Collapsible.Root>
