<script lang="ts">
  import { getIcon } from 'obsidian'

  const { iconId }: { iconId: string } = $props()

  let svg = $derived(getIcon(iconId))
</script>

{#if svg}
  <div
    {@attach el => {
      el.replaceChildren(svg)
    }}
  ></div>
{/if}
