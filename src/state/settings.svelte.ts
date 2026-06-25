import type TagFoldersPlugin from '../main.svelte.js'
import { SortOrder } from '$lib/enums/SortOrder'

export const DEFAULT_SETTINGS: TagFoldersSettings = {
  exclusions: ['Attachments'],
  icons: {},
  sortOrder: SortOrder.filename_asc
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
    temp.exclusions = DEFAULT_SETTINGS.exclusions
  }
  if (!temp.icons) {
    temp.icons = DEFAULT_SETTINGS.icons
  }
  if (!temp.sortOrder) {
    temp.sortOrder = DEFAULT_SETTINGS.sortOrder
  }

  _settings = temp

  $effect(() => {
    console.log('[TagFolders] Saving settings', $state.snapshot(_settings))
    saveDataFn($state.snapshot(_settings))
  })
}
