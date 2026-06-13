import { SvelteMap } from 'svelte/reactivity'
import { type App, getAllTags, type TFile } from 'obsidian'

export const tags = new SvelteMap<string, TFile[]>()

export function rebuildTags(app: App) {
  tags.clear()

  app.vault.getFiles().forEach(file => {
    const cache = app.metadataCache.getFileCache(file)
    // TODO: getFileCache returns "{}" for canvases. They are in the cache, but it doesn't actually store anything about them.
    // TODO: Obsidian also doesn't show tags inside canvas files in the Tags view, but they _DO_ show up in search results!
    if (!cache) return

    const dedupedTags = Array.from(new Set(getAllTags(cache)))

    // absoluteTag similar to an "absolute path"
    for (const absoluteTag of dedupedTags) {
      const absoluteTagParts = absoluteTag
        .slice(1) // trim the '#' off the front
        .split('/')

      for (let i = 0; i < absoluteTagParts.length; i++) {
        // Each part of the path including all previous parts becomes a discrete tag, as mentioned above.
        // So this tag we're inserting here might not be a "real" tag, hence why it's called "maybePseudoTag"
        const maybePseudoTag = '/' + absoluteTagParts.slice(0, i + 1).join('/')
        tags.set(maybePseudoTag, [...(tags.get(maybePseudoTag) ?? []), file])
      }
    }
  })
}

let selected = $state('')

export const selectedTag = {
  get current() {
    return selected
  },
  set current(newSelectedTag) {
    selected = newSelectedTag
  },
}