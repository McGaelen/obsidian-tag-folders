import type { TFile } from 'obsidian'

declare global {
  interface TagFolder {
    files: TFile[]
    subTags?: Record<string, TagFolder>
  }
}
