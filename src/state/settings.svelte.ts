import type TagFoldersPlugin from '../main'

export interface TagIcon {
  iconId?: string
  raw?: string
}

export interface TagFoldersSettings {
  exclusions: string[]
  icons: Record<MaybePseudoTag, TagIcon>
}

export const DEFAULT_SETTINGS: TagFoldersSettings = {
  exclusions: [],
  icons: {},
}

let _settings = $state(DEFAULT_SETTINGS)
let saveData: TagFoldersPlugin['saveData']

export function useSettings(): { current: TagFoldersSettings } {
  $effect(() => {
    console.log('save called', $state.snapshot(_settings))
    saveData($state.snapshot(_settings))
  })
  return {
    get current() {
      return _settings
    },
  }
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
  saveData = saveDataFn
}

