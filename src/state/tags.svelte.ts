import { SvelteMap, SvelteSet } from 'svelte/reactivity'
import { type App, getAllTags, type TFile } from 'obsidian'
import { settings } from '$state/settings.svelte'

export const tags = new SvelteMap<MaybePseudoTag | symbol, SvelteSet<TFile>>()
export const taggedFiles = Symbol()
export const untaggedFiles = Symbol()
export const filteredFiles = Symbol()

export function rebuildTags(app: App) {
  tags.clear()

  app.vault.getFiles().forEach(file => {
    const cache = app.metadataCache.getFileCache(file)
    // TODO: getFileCache returns "{}" for canvases. They are in the cache, but it doesn't actually store anything about them.
    // TODO: Obsidian also doesn't show tags inside canvas files in the Tags view, but they _DO_ show up in search results!
    if (!cache) return

    // TODO: the exclusions setting should be more configurable to allow specific files to be excluded by regex
    if (
      ['svg', 'png', 'jpeg', 'jpg', 'canvas', 'base'].includes(
        file.extension,
      ) ||
      settings.current.exclusions.some(e => file.path.startsWith(e))
    ) {
      upsert(filteredFiles, file)
      return
    }

    const fileTags = getAllTags(cache)

    if (!fileTags?.length) {
      upsert(untaggedFiles, file)
      return
    }

    upsert(taggedFiles, file)

    // absoluteTag similar to an "absolute path"
    for (const absoluteTag of fileTags) {
      const absoluteTagParts = absoluteTag
        .slice(1) // trim the '#' off the front
        .split('/')

      for (let i = 0; i < absoluteTagParts.length; i++) {
        // Each part of the path including all previous parts becomes a discrete tag, as mentioned above.
        // So this tag we're inserting here might not be a "real" tag, hence why it's called "maybePseudoTag"
        const maybePseudoTag = '#' + absoluteTagParts.slice(0, i + 1).join('/')
        upsert(maybePseudoTag, file)
      }
    }
  })
}

function upsert(key: string | symbol, file: TFile) {
  const fileSet = tags.get(key)
  if (fileSet) {
    fileSet.add(file)
  } else {
    tags.set(key, new SvelteSet([file]))
  }
}
