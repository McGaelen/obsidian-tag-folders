<script lang="ts">
  import { IconSuggest } from '$lib/suggest/IconSuggest'
  import RegisteredIcon from '$lib/obsidian/icon/RegisteredIcon.svelte'
  import SettingItem from '$lib/obsidian/setting-group/SettingItem.svelte'
  import { settings } from '$state/settings.svelte'

  let { tag, onclose }: { tag: MaybePseudoTag; onclose: () => void } = $props()

  const current = $derived(settings.current.icons[tag])
  const lastTagPart = $derived(tag.split('/').last()?.replace('#', ''))

  let mode: 'iconId' | 'raw' = $derived(current.iconId ? 'iconId' : 'raw')
  let iconId = $derived(current.iconId)
  let raw = $derived(current.raw)

  function save() {
    if (mode === 'iconId') {
      settings.current.icons[tag] = {
        iconId,
        raw: undefined,
      }
    } else {
      settings.current.icons[tag] = {
        iconId: undefined,
        raw,
      }
    }
    onclose()
  }
</script>

<div class="flex items-center justify-center py-3 gap-1">
  {#if mode === 'iconId' && iconId}
    <RegisteredIcon {iconId} />
  {:else if raw !== undefined}
    <div>{raw}</div>
  {/if}
  <div class="text-sm wrap-anywhere">{lastTagPart}</div>
</div>

<SettingItem name="Icon">
  {#snippet control()}
    <select bind:value={mode} class="dropdown">
      <option value="iconId">Icon</option>
      <option value="raw">Raw</option>
    </select>

    {#if mode === 'iconId'}
      <input
        bind:value={iconId}
        type="text"
        placeholder="Icon: Choose from the list of icons registered in Obsidian."
        class="grow"
        {@attach el => {
          const is = new IconSuggest(app, el).onSelect(v => {
            iconId = v
            is.close()
          })
        }}
      />
    {:else}
      <input
        bind:value={raw}
        type="text"
        maxlength="2"
        placeholder="Raw: Enter in a single character (emoji) to use as the icon."
        class="grow"
      />
    {/if}
  {/snippet}
</SettingItem>

<SettingItem>
  {#snippet control()}
    <button class="mod-cta" onclick={save}>Save</button>
  {/snippet}
</SettingItem>
