<script lang="ts">
  import { settings } from '$state/settings.svelte'
  import { X } from '@lucide/svelte'
  import { displayTooltip } from 'obsidian'
  import { FolderSuggest } from '$lib/suggest/FolderSuggest'
  import SettingItem from '$lib/obsidian/setting-group/SettingItem.svelte'
  import { flushSync } from 'svelte'
  import SettingGroup from '$lib/obsidian/setting-group/SettingGroup.svelte'
  import { tags } from '$state/tags.svelte'

  let inputEl: HTMLInputElement
  let newExcl = $state('')

  let alreadyExists = $derived(settings.current.exclusions.includes(newExcl))

  function addExcl() {
    if (!alreadyExists && newExcl !== '') {
      settings.current.exclusions.push(newExcl)
      newExcl = ''

      // Before focusing the input, let svelte updates finish so the FolderSuggest old suggestions for the previous value.
      flushSync()

      inputEl.focus()
    }

    tags.rebuildTags()
  }

  function removeExcl(excl: string) {
    settings.current.exclusions.remove(excl)
    tags.rebuildTags()
  }
</script>

<SettingGroup heading="Folder Exclusions">
  <SettingItem
    desc="All files in the following folders will be excluded from showing up in the TagFolders view, even if they contain tags. This is useful for things like hiding the attachments directory."
  />

  {#each settings.current.exclusions as excl}
    <div class="flex items-center justify-between min-h-[32px]">
      <div class="pl-3 wrap-anywhere text-sm!">{excl}</div>
      <button
        class="clickable-icon mobile-option-setting-item-option-icon h-[24px]! w-[24px]"
        aria-label="Delete"
        onclick={() => removeExcl(excl)}
      >
        <X size={24}></X>
      </button>
    </div>
  {/each}

  <div class="flex items-center w-full pl-3 gap-3 mt-1">
    <input
      bind:value={newExcl}
      bind:this={inputEl}
      type="text"
      placeholder="Folder name"
      class="grow"
      {@attach el => {
        const fs = new FolderSuggest(app, el).onSelect(v => {
          newExcl = v
          fs.close()
        })
      }}
      {@attach el => {
        if (alreadyExists) {
          displayTooltip(el, 'This exclusion is already added.', {
            placement: 'bottom',
            classes: ['mod-error'],
          })
        }
      }}
    />
    <button onclick={addExcl}>Add</button>
  </div>
</SettingGroup>
