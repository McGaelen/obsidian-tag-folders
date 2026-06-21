<script lang="ts">
  import { useSettings } from '$state/settings.svelte'
  import { X } from '@lucide/svelte'
  import { type App, displayTooltip } from 'obsidian'
  import { FolderSuggest } from './FolderSuggest'
  import SettingItem from '$lib/obsidian/setting-group/SettingItem.svelte'
  import { flushSync } from 'svelte'
  import SettingGroup from '$lib/obsidian/setting-group/SettingGroup.svelte'

  let { app }: { app: App } = $props()

  const settings = useSettings()

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
  }

  function removeExcl(excl: string) {
    settings.current.exclusions.remove(excl)
  }
</script>

<SettingGroup>
  <SettingItem
    name="Folder Exclusions"
    desc="Type the name of a folder to add. If the name begins and ends with a '/', then it will be treated as a /regex/."
  ></SettingItem>

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
      placeholder="Folder name or /regex/"
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
