<script lang="ts">
  import { useSettings } from '$state/settings.svelte'
  import { X } from '@lucide/svelte'
  import { type App, displayTooltip } from 'obsidian'
  import SettingItem from '$lib/obsidian/setting-group/SettingItem.svelte'
  import { flushSync } from 'svelte'
  import SettingGroup from '$lib/obsidian/setting-group/SettingGroup.svelte'
  import { TagSuggest } from './TagSuggest'
  import { SvelteModal } from '$lib/obsidian/modal/SvelteModal'
  import TagIconModalContent from './TagIconModalContent.svelte'
  import RegisteredIcon from '$lib/obsidian/icon/RegisteredIcon.svelte'
  import TagIconDisplay from '$lib/TagIconDisplay.svelte'

  let { app }: { app: App } = $props()

  const settings = useSettings()

  let inputEl: HTMLInputElement
  let newTag: MaybePseudoTag = $state('')

  let alreadyExists = $derived(
    Object.keys(settings.current.icons).includes(newTag),
  )

  function addTag() {
    if (!alreadyExists && newTag !== '') {
      settings.current.icons = {
        ...settings.current.icons,
        [newTag]: {},
      }
      newTag = ''

      // Before focusing the input, let svelte updates finish so the FolderSuggest old suggestions for the previous value.
      flushSync()

      inputEl.focus()
    }
  }

  function removeTag(tag: MaybePseudoTag) {
    delete settings.current.icons[tag]
  }
</script>

<SettingGroup>
  <SettingItem
    name="Tag Icons"
    desc="Give your tags icons to make them visually distinct."
  ></SettingItem>

  {#each Object.entries(settings.current.icons) as [tag, { iconId, raw }]}
    <div class="flex items-center justify-between min-h-[32px]">
      <div class="flex items-center gap-2">
        <TagIconDisplay icon={{iconId, raw}} />
        <div class="wrap-anywhere text-sm!">{tag}</div>
      </div>
      <div class="flex items-center">
        <button
          class="h-[24px]!"
          aria-label="Delete"
          onclick={() =>
            new SvelteModal(app, TagIconModalContent, { app, tag })
              .setTitle('Configure Tag Icon')
              .open()}
        >
          Configure
        </button>
        <button
          class="clickable-icon mobile-option-setting-item-option-icon h-[24px]! w-[24px]"
          aria-label="Delete"
          onclick={() => removeTag(tag)}
        >
          <X size={24}></X>
        </button>
      </div>
    </div>
  {/each}

  <div class="flex items-center w-full pl-3 gap-3 mt-1">
    <input
      bind:value={newTag}
      bind:this={inputEl}
      type="text"
      placeholder="#Tag name"
      class="grow"
      {@attach el => {
        const fs = new TagSuggest(app, el).onSelect(v => {
          newTag = v
          fs.close()
        })
      }}
      {@attach el => {
        if (alreadyExists) {
          displayTooltip(el, 'This tag is already added.', {
            placement: 'bottom',
            classes: ['mod-error'],
          })
        }
      }}
    />
    <button onclick={addTag}>Add</button>
  </div>
</SettingGroup>
