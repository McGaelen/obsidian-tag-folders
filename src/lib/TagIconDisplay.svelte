<script lang="ts">
  import RegisteredIcon from '$lib/obsidian/icon/RegisteredIcon.svelte'
  import { type ClassValue } from 'svelte/elements'

  const { icon, class: clazz }: { icon: TagIcon; class?: ClassValue } = $props()
</script>

<div class={clazz}>
  {#if icon.iconId}
    <RegisteredIcon iconId={icon.iconId} />
  {:else if icon.raw}
    {icon.raw}
  {/if}
</div>
