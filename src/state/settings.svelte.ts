import type TagFoldersPlugin from '../main.svelte.js'

export const DEFAULT_SETTINGS: TagFoldersSettings = {
  exclusions: ['Attachments'],
  icons: {},
}

let _settings = $state(DEFAULT_SETTINGS)
export const settings = {
  get current() {
    return _settings
  },
  set current(newSettings) {
    _settings = newSettings
  },
}

export function initSettings(
  initial: TagFoldersSettings | null,
  saveDataFn: TagFoldersPlugin['saveData'],
) {
  // Validation
  let temp = initial

  if (!temp) {
    temp = DEFAULT_SETTINGS
  }
  if (!temp.exclusions) {
    temp.exclusions = []
  }
  if (!temp.icons) {
    temp.icons = {}
  }

  _settings = temp

  $effect(() => {
    console.log('[TagFolders] Saving settings', $state.snapshot(_settings))
    saveDataFn($state.snapshot(_settings))
  })
}
