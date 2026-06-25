import type TagFoldersPlugin from '../main.svelte.js'
import { SortOrder } from '$lib/enums/SortOrder'

export const DEFAULT_SETTINGS: TagFoldersSettings = {
  exclusions: ['Attachments'],
  icons: {},
  sortOrder: SortOrder.filename_asc,
  selectedTag: null,
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
  _settings = {
    ...DEFAULT_SETTINGS,
    ...initial,
  }

  $effect(() => {
    console.log('[TagFolders] Saving settings', $state.snapshot(_settings))
    saveDataFn($state.snapshot(_settings))
  })
}
