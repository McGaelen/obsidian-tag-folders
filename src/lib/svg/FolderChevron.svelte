<script lang="ts">
  import { cn } from '$lib/shadcn/utils'

  let { isExpanded = $bindable() }: { isExpanded?: boolean } = $props()
</script>

<svg
  style="width: var(--size-4-4); opacity: var(--icon-opacity); color: var(--nav-collapse-icon-color);"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="svg-icon right-triangle !transition {cn([
    { '-rotate-90': !isExpanded },
  ])}"
>
  <path d="M3 8L12 17L21 8"></path>
</svg>
