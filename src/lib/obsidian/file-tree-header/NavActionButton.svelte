<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    hasActiveMenu,
    onclick,
    children,
  }: {
    hasActiveMenu?: boolean
    onclick?: (e: MouseEvent) => void
    children?: Snippet
  } = $props()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={[
    'clickable-icon nav-action-button',
    { 'has-active-menu': hasActiveMenu },
  ]}
  {onclick}
>
  {@render children?.()}
</div>
