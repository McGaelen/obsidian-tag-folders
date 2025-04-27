import { type App, getAllTags } from 'obsidian'
import { get, set } from 'lodash-es'

export interface TagFolderCache {
  root: TagFolder
  rebuild(app: App): void
}

const initialRoot: TagFolder = {
  files: [],
}

export const tagFolderCache: TagFolderCache = $state({
  root: initialRoot,

  rebuild(app: App) {
    this.root = initialRoot

    app.vault.getFiles().forEach(file => {
      // if (
      //   (!file.name.endsWith('.md') && !file.name.endsWith('.canvas')) ||
      //   file.path.includes('excalidraw')
      // ) {
      //   return
      // }

      const cache = app.metadataCache.getFileCache(file)
      if (!cache) return

      const dedupedTags = new Set(getAllTags(cache))

      if (dedupedTags.size !== 0) {
        dedupedTags.forEach(tag => {
          const tagPathAry = tag.slice(1).split('/')

          const rootObjPath = tagPathAry.reduce(
            (acc, tag, i) =>
              `${acc}.${tag}${i === tagPathAry.length - 1 ? '' : '.subTags'}`,
            'subTags',
          )

          // prettier-ignore
          let files = get(this.root, `${rootObjPath}.files`) as unknown as (string[] | null)
              ?? []

          set(this.root, `${rootObjPath}.files`, [...files, file])
        })
      } else {
        // untagged files
        this.root.files = [...this.root.files, file]
      }
    })
  },
})
