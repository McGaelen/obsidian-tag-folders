import { SvelteMap, SvelteSet } from 'svelte/reactivity'
import { getAllTags, Notice, type TFile } from 'obsidian'
import { settings } from '$state/settings.svelte'
import type { CanvasData } from 'obsidian/canvas'

export class Tags {
  static taggedFiles = Symbol()
  static untaggedFiles = Symbol()
  static filteredFiles = Symbol()

  #current: SvelteMap<MaybePseudoTag | symbol, SvelteSet<TFile>>

  constructor() {
    this.#current = new SvelteMap()
  }

  get current() {
    return this.#current
  }

  async rebuildTags() {
    this.#current.clear()

    for (const file of app.vault.getFiles()) {
      const cache = app.metadataCache.getFileCache(file)
      if (!cache) continue

      // TODO: the exclusions setting should be more configurable to allow specific files to be excluded by regex
      if (
        ['svg', 'png', 'jpeg', 'jpg', 'base'].includes(file.extension) ||
        settings.current.exclusions.some(e => file.path.startsWith(e))
      ) {
        this.#upsert(Tags.filteredFiles, file)
        continue
      }

      let fileTags: string[] | null = null
      if (file.extension === 'canvas') {
        fileTags = await this.#processCanvas(file)
      } else {
        fileTags = getAllTags(cache)
      }

      if (!fileTags?.length) {
        this.#upsert(Tags.untaggedFiles, file)
        continue
      }

      this.#upsert(Tags.taggedFiles, file)

      // absoluteTag similar to an "absolute path"
      for (const absoluteTag of fileTags) {
        const absoluteTagParts = absoluteTag
          .slice(1) // trim the '#' off the front
          .split('/')

        for (let i = 0; i < absoluteTagParts.length; i++) {
          // Each part of the path including all previous parts becomes a discrete tag, as mentioned above.
          // So this tag we're inserting here might not be a "real" tag, hence why it's called "maybePseudoTag"
          const maybePseudoTag =
            '#' + absoluteTagParts.slice(0, i + 1).join('/')
          this.#upsert(maybePseudoTag, file)
        }
      }
    }
  }

  #upsert(key: string | symbol, file: TFile) {
    const fileSet = this.#current.get(key)
    if (fileSet) {
      fileSet.add(file)
    } else {
      this.#current.set(key, new SvelteSet([file]))
    }
  }

  /**
   * Obsidian has quirky behavior around tags in canvases.
   * getFileCache() returns "{}" for canvases. They are in the cache, but it doesn't actually store anything about them.
   * (It would return null if it _wasn't_ in the cache.)
   * Obsidian also doesn't show tags inside canvas files in the Tags view, but they _DO_ show up in search results!
   * And, fun fact, when typing a new tag, the suggest dropdown doesn't contain any tags that only exist in canvases.
   *
   * So we have to manually parse the content of the canvas file's nodes to find tags.
   *
   * This function will read the content of a canvas, then iterate through all nodes of type 'text',
   * extracting any tags found in its text content.
   */
  async #processCanvas(canvas: TFile): Promise<MaybePseudoTag[]> {
    const tags: string[] = []
    try {
      const content = await app.vault.cachedRead(canvas)

      const json: CanvasData = JSON.parse(content)
      for (const node of json.nodes) {
        if (node.type === 'text') {
          tags.push(...this.#collectTags(node.text))
        }
      }
    } catch (e) {
      console.error(e)
      new Notice(`Failed to parse canvas file for tags: ${canvas.basename}`)
    }

    return tags
  }

  /**
   * This iterates char-by-char through a string and extracts any tags it finds into an array.
   * I tried this with regex first - it sucked, and was utterly unreadable.
   * So... we're going CS 101 style with this one.
   *
   * WARNING:
   * A reasonable attempt was made to try and reverse engineer what Obsidian considers a valid tag,
   * but the logic may not cover all the same scenarios that they do.
   * Someday, if they expose a function to parse tags, we can just use that instead - but they don't currently do that.
   */
  #collectTags(text: string): MaybePseudoTag[] {
    const tags: MaybePseudoTag[] = []

    // this means "are we currently inside a tag during iteration"
    let isInTag = false
    // this is an accumulator that is updated for every character where isInTag is true
    let tag = ''

    for (let i = 0; i < text.length; i++) {
      const c = text[i]

      // This is "did we start the current iteration inside a tag, but then determined that we've now exited that tag".
      // Resets every iteration.
      let hasLeftTag = false

      if (isInTag) {
        // If we were already in a tag, we have to check to see if we've exited it.
        // Check to see if `c` is an alphanumeric character or a forward-slash. If it's not, we're no longer in a tag.
        isInTag = !!c.match(/[\w|/]/)
        // If `isInTag` got flipped, that means we exited a tag on this iteration...
        // OR, it means that this is the last character in the string.
        // Note that `isInTag` can still be true when the last character of the tag is also the last character of the string.
        hasLeftTag = i + 1 === text.length || !isInTag
      } else {
        // If we weren't already in a tag, then we need to check if we're entering one.
        // Check if `c` is a '#', and that either it's the first character of the string or the preceding character is whitespace.
        // (The '#' can't butt up against any non-whitespace characters, otherwise it's not considered a tag.)
        // prettier-ignore
        isInTag = !!(
          c === '#' &&
          (i === 0 || text[i-1].match(/\s/))
        )
      }

      // After all that, if we are in a tag, then we need to update the accumulator.
      if (isInTag) {
        tag += c
      }

      // Then, if we've exited a tag, we need to add it to the `tags` array so it can be returned,
      // and the accumulator needs to be reset to start accepting another potential tag.
      if (hasLeftTag) {
        tags.push(tag)
        tag = ''
      }
    }

    return tags
  }
}

export const tags = new Tags()
