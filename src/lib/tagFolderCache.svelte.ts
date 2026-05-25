import { type App, getAllTags, type TFile } from 'obsidian'
import { get, set } from 'lodash-es'

export interface TagFolder {
  files?: TFile[]
  subTags?: Record<string, TagFolder>
}

const initialRoot: TagFolder = {
  files: [],
}

let root: TagFolder = $state(initialRoot)

export const tagFolderCache = {
  get current() {
    return root
  },
  set current(val) {
    root = val
  },

  rebuild(app: App) {
    root = initialRoot

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
        dedupedTags.forEach(fullTag => {
          const tagPathAry = fullTag.slice(1).split('/')

          const rootObjPath = tagPathAry.reduce(
            (acc, tag, i) =>
              `${acc}.${tag}${i === tagPathAry.length - 1 ? '' : '.subTags'}`,
            'subTags',
          )

          // prettier-ignore
          const files = get(root, `${rootObjPath}.files`) as unknown as (string[] | null)
              ?? []

          set(root, `${rootObjPath}.files`, [...files, file])
        })
      } else {
        // untagged files
        root.files = [...(root.files ?? []), file]
      }
    })
  },
}
