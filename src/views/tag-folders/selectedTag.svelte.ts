import type { TFile } from 'obsidian'

interface SelectedTag {
  tagPath: string
  files: TFile[]
}

let selected: SelectedTag = $state({
  tagPath: '',
  files: [],
})

export const selectedTag = {
  get current() {
    return selected
  },
  set current(newSelectedTag: SelectedTag) {
    selected = newSelectedTag
  },
}
