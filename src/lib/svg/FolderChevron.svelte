<script lang="ts">
  import { cn } from '$lib/shadcn/utils'
  import { ChevronRight } from 'lucide-svelte'

  let { isExpanded = $bindable() }: { isExpanded?: boolean } = $props()
</script>

<ChevronRight
  class="transition {cn([{ 'rotate-90': isExpanded }])}"
  style="width: var(--size-4-4); opacity: var(--icon-opacity); color: var(--nav-collapse-icon-color);"
  strokeWidth="2px"
/>
