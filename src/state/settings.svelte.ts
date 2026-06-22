import type TagFoldersPlugin from '../main.svelte.js'

export const DEFAULT_SETTINGS: TagFoldersSettings = {
  exclusions: [],
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
  initial: TagFoldersSettings,
  saveDataFn: TagFoldersPlugin['saveData'],
) {
  // Validation
  const _temp = initial
  if (!_temp.exclusions) {
    _temp.exclusions = []
  }
  if (!_temp.icons) {
    _temp.icons = {}
  }

  _settings = _temp

  $effect(() => {
    console.log('save called', $state.snapshot(_settings))
    saveDataFn($state.snapshot(_settings))
  })
}
